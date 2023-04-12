import express, { Router } from 'express';
import { healthCheckController } from '../controllers/healthCheck';

const healthCheckRouter: Router = express.Router()

healthCheckRouter.get('/', healthCheckController)

export default healthCheckRouter