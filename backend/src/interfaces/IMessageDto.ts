import IMessage from "./IMessage";

export default interface IMessageDto{
    user: IMessage['_id']
    message: IMessage['message']
}