import { Request, Response } from 'express';
import IResponse from '../interfaces/IResponse';
import { EStatuses } from '../enum/EStatuses';
import IUserGetDto from '../interfaces/IUserGetDto';
import { User } from '../models/User';
import { generateJWT } from '../helpers/generateJWT';
import IModifiedRequest from '../interfaces/IModifiedRequest';
import IUserCreateDto from '../interfaces/IUserCreateDto';

export const createUser = async(req: Request, res: Response) => {
    try{
        const userDto: IUserGetDto = req.body
        const user = new User(userDto)
        await user.save()
        const responseData: IUserGetDto = {
            _id: user._id,
            username: user.username, 
            token: generateJWT({_id: user._id, username: user.username})
        }
        const response: IResponse<IUserGetDto> = {
            status: EStatuses.SUCCESS,
            result: responseData,
            message: 'User added'
        }
        res.status(200).send(response)
    } catch(err: unknown){
        const error = err as Error
        const response: IResponse<null> = {
            status: EStatuses.FAILURE,
            result: null,
            message: error.message
        }
        res.status(418).send(response)
    }
}

export const loginUser = async(req: Request, res: Response): Promise<void> => {
    try{
        const userDto: IUserCreateDto = req.body
        const user = await User.findOne({username: userDto.username})
        if (!user) throw new Error('User not found')
        const isMatch: boolean = await user.checkPassword(userDto.password)
        if (!isMatch) throw new Error('Wrong password')
        await user.save()
        const responseData = {
            _id: user._id,
            username: user.username, 
            token: generateJWT({_id: user._id, username: user.username})
        }
        const response: IResponse<IUserGetDto> = {
            status: EStatuses.SUCCESS,
            result: responseData,
            message: 'Access granted'
        }
        res.status(200).send(response)
    } catch(err: unknown){
        const error = err as Error
        const response: IResponse<null> = {
            status: EStatuses.FAILURE,
            result: null,
            message: error.message
        }
        res.status(418).send(response)
    }
}

export const checkToken = async (req: Request, res: Response): Promise<void> => {
    const modifiedReq = req as IModifiedRequest
    const response: IResponse<IUserGetDto | null> = {
        status: EStatuses.SUCCESS,
        result: modifiedReq.verifiedData as IUserGetDto,
        message: 'Token is ok'
    }
    res.status(200).send(response)
}



