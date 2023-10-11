// PurchaseRequisition.mjs

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
  quantity: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
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
