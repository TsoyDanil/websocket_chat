import { Types } from "mongoose";
import IUser from "./IUser";

export default interface IMessage{
    _id: Types.ObjectId
    author: IUser['username']
    message: string
}