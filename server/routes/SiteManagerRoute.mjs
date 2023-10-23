import express from 'express';

import {
  register,
  login
} from '../controllers/SiteManagerController.mjs';

const route = express.Router();

route.post("/register", register);
route.post("/login", login);

export default route;
