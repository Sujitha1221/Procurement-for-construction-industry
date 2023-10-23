import { Router } from "express";
import { makePayment } from "../controllers/PaymentController.mjs";
const PaymentRouter = Router();

PaymentRouter.post("/add-payment", makePayment);

export default PaymentRouter;
