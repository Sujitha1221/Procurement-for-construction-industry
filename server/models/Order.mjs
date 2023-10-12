import mongoose from "mongoose";
import PurchaseRequisition from "./PurchaseRequisition.mjs";

const OrderSchema = new mongoose.Schema({
  purchaseRequisition: {
    type: mongoose.ObjectId,
    ref: PurchaseRequisition,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  }
});

const Order = mongoose.model(
  "Order",
  OrderSchema
);

export default Order;
