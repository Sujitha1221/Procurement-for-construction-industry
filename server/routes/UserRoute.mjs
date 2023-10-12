import {createUser} from '../controllers/UserController.mjs';
import Router from "express";

const UserRouter = Router();

UserRouter.post('/add', createUser);

export default UserRouter;