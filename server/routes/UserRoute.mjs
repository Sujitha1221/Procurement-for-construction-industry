import {createUser, getAllUser} from '../controllers/UserController.mjs';
import Router from "express";

const UserRouter = Router();

UserRouter.post('/add', createUser);
UserRouter.get('/get-all', getAllUser);

export default UserRouter;