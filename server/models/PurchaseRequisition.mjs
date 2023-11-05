import mongoose from "mongoose";

const PurchaseRequisitionSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  projectName:{
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  approvalStatus: {
    type: String,
    required: true,
  },

  reason: {
    type: String,
    required: false,
  }
});

const PurchaseRequisition = mongoose.model(
  "PurchaseRequisition",
  PurchaseRequisitionSchema
);

export default PurchaseRequisition;
