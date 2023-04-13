import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const MessageScheme = new Scheme({
    user: {
        type: Scheme.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: false,
        default: Date.now()
    }
});

const Message = mongoose.model('Message', MessageScheme);

export default Message;