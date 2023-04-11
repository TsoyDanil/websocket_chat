import express, { Request, Response, Router } from "express"
import { MessagesService, messagesService } from "../services/messagesService"
import { auth } from "../middlewares/auth"
import IResponse from "../interfaces/IResponse"
import IMessage from "../interfaces/IMessage"
import { EStatuses } from "../enum/EStatuses"
import IModifiedRequest from "../interfaces/IModifiedRequest"
import IMessageDto from "../interfaces/IMessageDto"


export class MessagesController {
    private service: MessagesService
    private router: Router
    constructor(){
        this.service = messagesService
        this.router = express.Router()
        this.router.get('/', auth, this.getMessages)
        this.router.post('/', auth, this.addMessage)
    }

    public getRouter = () => {
        return this.router
    }

    private getMessages = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IMessage[] | null> = await this.service.getMessages()
        if (response.status === EStatuses.SUCCESS){
            res.status(200).send(response)
        } else{
            res.status(418).send(response)
        }
    }

    private addMessage = async (req: Request, res: Response): Promise<void> => {
        const modifiedReq = req as IModifiedRequest
        if (typeof modifiedReq.verifiedData === 'object'){
            const {message} = req.body
            const {_id} = modifiedReq.verifiedData
            const messageDto: IMessageDto = {
                user: _id,
                message: message
            }
            const response: IResponse<IMessage | null> = await this.service.addMessage(messageDto)
            if (response.status === EStatuses.SUCCESS){
                res.status(200).send(response)
            } else{
                res.status(418).send(response)
            }
        } else{
            res.status(418).send('error in request. Some invalid field appeared')
        }
    }
}

export const messagesController = new MessagesController()