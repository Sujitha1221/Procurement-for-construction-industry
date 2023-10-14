import { Router } from "express";
import { addPayment } from "../controllers/PaymentController.mjs";
const PaymentRouter = Router();

PaymentRouter.post("/add-payment", addPayment);

export default PaymentRouter;
