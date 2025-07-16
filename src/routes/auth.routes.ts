import { Router } from 'express';

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/signup').post(signup);

export default authRouter;
