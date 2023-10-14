import Router from "express";
import {
  addOrder,
  getOrdersBySupplier,
  updateStatus,
  getOrderDetails,
} from "../controllers/OrderController.mjs";
const OrderRouter = Router();

OrderRouter.post("/add-order", addOrder);
OrderRouter.get("/get-orders/:supplierId", getOrdersBySupplier);
OrderRouter.put("/:orderId/update-status", updateStatus);
OrderRouter.get("/get-order/:orderId", getOrderDetails);

export default OrderRouter;
