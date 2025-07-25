import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { login, signup } from '../controllers/auth.controller';
import { loginSchema, signupSchema } from '../validators/auth.schema';

const authRouter = Router();

authRouter.route('/login').post(validate(loginSchema), login);
authRouter.route('/signup').post(validate(signupSchema), signup);

export default authRouter;
