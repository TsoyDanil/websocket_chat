import mongoose from 'mongoose';
import express from "express";
import cors from 'cors';
import config from './config.js';
import expressWs from "express-ws";
import Users from './routes/Users.js';
import ChatWs from './routes/ChatWs.js';

const app = express();
const PORT = 8000;
expressWs(app);

app.use(cors());
app.use(express.json());
app.use('/users', Users);
app.use('/chat', ChatWs);


const run = async() => {
    mongoose.connect(`${config.db.url}/${config.db.name}`, {useNewUrlParser: true});

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);