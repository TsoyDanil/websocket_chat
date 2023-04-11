import IMessage from "../interfaces/IMessage";
import IMessageDto from "../interfaces/IMessageDto";
import IResponse from "../interfaces/IResponse";
import { MongooseDB, mongooseDB } from "../repository/mongooseDB";


export class MessagesService {
    private repository: MongooseDB
    constructor(){
        this.repository = mongooseDB
    }

    public getMessages = async(): Promise<IResponse<IMessage[] | null>> => {
        return await this.repository.getMessages()
    }

    public addMessage = async(messageDto: IMessageDto): Promise<IResponse<IMessage | null>> => {
        return await this.repository.addMessage(messageDto)
    }
}

export const messagesService = new MessagesService()