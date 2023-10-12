import Router from "express";
import {
    addOrder
  } from '../controllers/OrderController.mjs';
const OrderRouter = Router();

OrderRouter.post('/add-order', addOrder);

export default OrderRouter;