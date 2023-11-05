import Router from "express";
import {
  addItems,
  getOrdersBySupplier,
  updateStatus,
  getOrderDetails,
  getOrderStatus,
} from "../controllers/OrderController.mjs";
const OrderRouter = Router();

OrderRouter.post("/add-order", addItems);
OrderRouter.get("/get-orders/:supplierId", getOrdersBySupplier);
OrderRouter.put("/:orderId/update-status", updateStatus);
OrderRouter.get("/get-order/:orderId", getOrderDetails);
OrderRouter.get("/get-order-status/:orderId", getOrderStatus);

export default OrderRouter;
