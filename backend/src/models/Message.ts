import mongoose, { Schema } from "mongoose";
import IMessage from "../interfaces/IMessage";

const MessageSchema: Schema = new Schema<IMessage>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        minlength: 1,
        required: [true, 'User id has to be provided']
    },
    message: {
        type: String,
        trim: true,
        minlength: 1,
        required: [true, 'Username should exist']
    }
})

export const Message = mongoose.model<IMessage>('Message', MessageSchema)