import express from 'express';
import expressWs from 'express-ws';
import { nanoid } from 'nanoid';
import User from '../models/User.js';
import Message from '../models/Message.js';

const router = express.Router();
expressWs(router);

const activeConnections = {};
const users = [];

router.ws('/', (ws, req) => {
    const id = nanoid();
    console.log(`Client connected id=${id}`);
    activeConnections[id] = ws;

    ws.on('close', async (msg) => {
        console.log(`Client disconnected id = ${id}`);
        delete activeConnections[id];
    });

    ws.on('message', async (msg) => {
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
                const oflineUser = await User.find({_id: decodedMessage.user._id});
                Object.keys(activeConnections).forEach(connId => {
                    const conn = activeConnections[connId];
                    conn.send(JSON.stringify({
                        type: "CLOSED_CHAT_USER",
                        id: oflineUser[0]._id
                    }));
                });
                break;
            case 'CREATE_MESSAGE':
                const message = new Message({user: decodedMessage.user.id, message: decodedMessage.user.text});
                await message.save();
                const user = await User.findOne({_id: decodedMessage.user.id});
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
    });
});



export default router;