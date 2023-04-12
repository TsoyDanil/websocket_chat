import express, { Router } from "express";
import expressWs from "express-ws";
import shortid from "shortid";
import { User } from "../models/User";
import { Message } from "../models/Message";


const messagesRouter: any = express.Router()
expressWs(messagesRouter)

const activeConnections: any= {};
const users: any[] = [];

messagesRouter.ws('/', (ws: any, req: any) => {
    const id = shortid.generate()
    console.log(`Client connected id=${id}`);
    activeConnections[id] = ws

    ws.on('close', async (msg: any) => {
        console.log(`Client disconnected id = ${id}`);
        delete activeConnections[id];
    })

    ws.on('message', async (msg: any) => {
        const decodedMessage = JSON.parse(msg);
        switch (decodedMessage.type) {
            case 'OPEN_CHAT':
                const onlineUser = await User.find({_id: decodedMessage.user._id});
                users.push(onlineUser[0]);
                Object.keys(activeConnections).forEach(connId => {
                    const conn = activeConnections[connId];
                    conn.send(JSON.stringify({
                        type: "OPEN_CHAT_USER",
                        user: users
                    }));
                });
                break;
            case 'CLOSED_CHAT':
                const offlineUser = await User.find({_id: decodedMessage.user._id});
                Object.keys(activeConnections).forEach(connId => {
                    const conn = activeConnections[connId];
                    conn.send(JSON.stringify({
                        type: "CLOSED_CHAT_USER",
                        id: offlineUser[0]._id
                    }));
                });
                break;
            case 'CREATE_MESSAGE':
                const message = new Message({user: decodedMessage.user.id, message: decodedMessage.user.text});
                await message.save();
                const user = await User.findOne({_id: decodedMessage.user.id});
                // @ts-ignore
                const newMessage = {...message._doc, user: user.username};
                Object.keys(activeConnections).forEach(connId => {
                    const conn = activeConnections[connId];
                    conn.send(JSON.stringify({
                        type: "NEW_MESSAGES",
                        message: newMessage
                    }));
                });
                break;
            case 'GET_ALL_MESSAGES': 
                const AllMessages = await Message.find().sort([['datetime', -1]]).populate('user');
                Object.keys(activeConnections).forEach(connId => {
                    const conn = activeConnections[connId];
                    conn.send(JSON.stringify({
                        type: "ALL_MESSAGES",
                        allMessages: AllMessages
                    }));
                });
                break;
            default:
                break;
        }
    })
})