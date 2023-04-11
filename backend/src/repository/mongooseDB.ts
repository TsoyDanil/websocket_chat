import dotenv from 'dotenv'
import mongoose, { Mongoose } from 'mongoose'
import IResponse from '../interfaces/IResponse'
import { EStatuses } from '../enum/EStatuses'
import IUserGetDto from '../interfaces/IUserGetDto'
import { generateJWT } from '../helpers/generateJWT'
import IUserCreateDto from '../interfaces/IUserCreateDto'
import { User } from '../models/User'

dotenv.config()

export class MongooseDB {
    private client: Mongoose | null = null

    public close = async() => {
        if (!this.client) return
        await this.client.disconnect();
    }

    public init = async (): Promise<void> => {
        try {
            this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL || '')
            console.log('Server connected to MongoDB');
        } catch (err) {
            const error = err as Error;
            console.error('Connected error MongooseDB:', error);
        }
    }

    public createUser = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | null>> => {
        try {
            const user = new User(userDto)
            await user.save()
            const data: IUserGetDto = {
                _id: user._id,
                username: user.username, 
                token: generateJWT({_id: user._id, username: user.username})
            }
            const response: IResponse<IUserGetDto> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'User added'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public loginUser = async(userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | null>> => {
        try{
            const user = await User.findOne({username: userDto.username})
            if (!user) throw new Error('User not found')
            const isMatch: boolean = await user.checkPassword(userDto.password)
            if (!isMatch) throw new Error('Wrong password')
            const data = {
                _id: user._id,
                username: user.username, 
                token: generateJWT({_id: user._id, username: user.username})
            }
            await user.save()
            const response: IResponse<IUserGetDto> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Access granted'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }
}