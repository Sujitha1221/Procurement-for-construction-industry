import express from 'express';

import {
  addItems,
  getAllItems
} from '../controllers/ItemController.mjs';

const route = express.Router();

route.post("/add-items", addItems);
route.get("/get-items",getAllItems);

export default route;
