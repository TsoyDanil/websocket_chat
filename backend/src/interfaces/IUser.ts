import {Document, Types} from "mongoose"

export default interface IUser extends Document {
    _id: Types.ObjectId
    username: string
    password: string
    checkPassword: (pass: string) => boolean
}