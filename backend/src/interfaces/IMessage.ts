import { Types } from "mongoose";
import IUser from "./IUser";

export default interface IMessage{
    _id: Types.ObjectId
    user: IUser
    message: string
}