import IMessage from "./IMessage";

export default interface IMessageDto{
    author: IMessage['author']
    message: IMessage['message']
}