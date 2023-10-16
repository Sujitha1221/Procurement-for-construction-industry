import express from 'express';

import {
  addItems
} from '../controllers/ItemController.mjs';

const route = express.Router();

route.post("/add-items", addItems);

export default route;
