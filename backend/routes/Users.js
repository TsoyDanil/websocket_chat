import express from 'express';
import User from '../models/User.js';
import shortid from 'shortid';

const router = express.Router();

router.post('/', async (req, res) => {
    const {username, password} = req.body
    try{
        const user = new User({
            username,
            password
        });
        user.generateToken();
        await user.save();
        res.send(user);
    }catch(error){
        return res.status(418).send(error);
    };
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(418).send({error: 'User not found'});

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch) return res.status(418).send({error: 'Password is wrong!'});

    return res.send(user);
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const successMessage = {message: 'Success'};

    if(!token) return res.send(successMessage);

    const user = await User.findOne({token});

    if(!user) return res.send(successMessage);

    user.token = shortid.generate();
    await user.save({ validateBeforeSave: false });

    return res.send(successMessage);
});

export default router;