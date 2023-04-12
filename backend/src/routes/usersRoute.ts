import express, { Router } from 'express';
import { checkToken, createUser, loginUser } from '../controllers/usersController';
import { auth } from '../middlewares/auth';

const usersRouter: Router = express.Router();

usersRouter.post('/', createUser)
usersRouter.post('/sessions', loginUser)
usersRouter.get('/token', auth, checkToken)

export default usersRouter