import mongoose from 'mongoose';
import express, {Express} from "express";
import cors from 'cors';
import expressWs from "express-ws";
import usersRouter from './routes/usersRoute';
import dotenv from 'dotenv'
import healthCheckRouter from './routes/healthCheckRouter';

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use('/health-check', healthCheckRouter)
app.use('/users', usersRouter)


const run = async(): Promise<void> => {
    try{
        mongoose.connect(process.env.MONGO_CLIENT_URL || 'mongodb://localhost/TsoyDanilChatDB')
        app.listen(process.env.APP_PORT, () => {
            console.log(`Server started at http://localhost:${process.env.APP_PORT}`);
        })
        process.on('exit', () => {
            mongoose.disconnect()
        })
    } catch(err: unknown){
        console.log(err);
    }
}

run()