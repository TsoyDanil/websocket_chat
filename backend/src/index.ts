import express, { Express } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { healthCheckController } from "./controllers/healthCheck";
import { mongooseDB } from "./repository/mongooseDB";
import { usersController } from "./controllers/usersController";
import { messagesController } from "./controllers/messagesController";

dotenv.config()

class App {
    private app: Express
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(cors())
    }

    public init = async(): Promise<void> => {
        try{
            this.app.use('/health-check', healthCheckController.getRouter())
            this.app.use('/users', usersController.getRouter())
            this.app.use('/messages', messagesController.getRouter())
            this.app.listen(process.env.APP_PORT, () => {
                console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
            })
            await mongooseDB.init()
            process.on('exit', () => {
                mongooseDB.close()
            })
        } catch(err: unknown){
            console.log(err); 
        }
    }
}

const app = new App();

app.init();