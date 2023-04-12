import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from './models/User'
import { Message } from './models/Message'

dotenv.config()

mongoose.connect(process.env.MONGO_CLIENT_URL || 'mongodb://localhost/TsoyDanilChatDB')

const db = mongoose.connection

export default db.once('open', async () => {
    try{
        await db.dropCollection('messages')
        await db.dropCollection('users')
    } catch(err: unknown){
        console.log(`Skipped db drop because of: ${err}`);
    }

    const [userOne, userTwo, userThree, userFour, userFive] = await User.create(
        {
            username: 'user1',
            password: 'pass'
        },
        {
            username: 'user2',
            password: 'pass'
        },
        {
            username: 'user3',
            password: 'pass'
        },
        {
            username: 'user4',
            password: 'pass'
        },
        {
            username: 'user5',
            password: 'pass'
        }
    )

    await Message.create(
    {
        user: userOne._id,
        message: 'mess1'
    },
    {
        user: userOne._id,
        message: 'mess2'
    },
    {
        user: userOne._id,
        message: 'mess3'
    },
    {
        user: userOne._id,
        message: 'mess4'
    },
    {
        user: userOne._id,
        message: 'mess5'
    },
    {
        user: userOne._id,
        message: 'mess6'
    },
    {
        user: userOne._id,
        message: 'mess7'
    },
    {
        user: userOne._id,
        message: 'mess8'
    },
    {
        user: userOne._id,
        message: 'mess9'
    },
    {
        user: userOne._id,
        message: 'mess10'
    },
    {
        user: userOne._id,
        message: 'mess11'
    },
    {
        user: userOne._id,
        message: 'mess12'
    },
    {
        user: userOne._id,
        message: 'mess13'
    },
    {
        user: userOne._id,
        message: 'mess14'
    },
    {
        user: userOne._id,
        message: 'mess15'
    },
    {
        user: userOne._id,
        message: 'mess16'
    },
    {
        user: userOne._id,
        message: 'mess17'
    },
    {
        user: userOne._id,
        message: 'mess19'
    },
    {
        user: userOne._id,
        message: 'mess20'
    },
    {
        user: userOne._id,
        message: 'mess21'
    },
    {
        user: userOne._id,
        message: 'mess22'
    },
    {
        user: userOne._id,
        message: 'mess23'
    },
    {
        user: userOne._id,
        message: 'mess24'
    },
    {
        user: userOne._id,
        message: 'mess25'
    },
    {
        user: userOne._id,
        message: 'mess26'
    },
    {
        user: userOne._id,
        message: 'mess27'
    },
    {
        user: userOne._id,
        message: 'mess28'
    },
    {
        user: userOne._id,
        message: 'mess29'
    },
    {
        user: userOne._id,
        message: 'mess30'
    },
    {
        user: userOne._id,
        message: 'mess31'
    },
    {
        user: userOne._id,
        message: 'mess32'
    },
    {
        user: userOne._id,
        message: 'mess33'
    },
    {
        user: userOne._id,
        message: 'mess34'
    },
    {
        user: userOne._id,
        message: 'mess35'
    }
    )

    db.close()
})