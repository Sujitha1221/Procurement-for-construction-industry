import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
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
  accountantId: {
    type: String,
    required: true,
  },
  accountantEmail: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
