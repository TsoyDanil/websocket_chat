import mongoose from 'mongoose';
import express from "express";
import cors from 'cors';
import expressWs from "express-ws";
import Users from './routes/Users.js';
import ChatWs from './routes/ChatWs.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
expressWs(app);

app.use(cors());
app.use(express.json());
app.use('/users', Users);
app.use('/chat', ChatWs);

const run = async() => {
    try{
        mongoose.connect(process.env.MONGO_CLIENT_URL, {useNewUrlParser: true});

    app.listen(process.env.APP_PORT, () => {
        console.log(`Server started at http://localhost:${process.env.APP_PORT}/`);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    });
    } catch(err){
        console.log(err)
    }
};

run()