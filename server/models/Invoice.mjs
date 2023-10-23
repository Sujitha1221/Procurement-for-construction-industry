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
  unitPrice: {
    type: String,
    required: true,
    default: "50",
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
  issuedDate: {
    type: Date,
    required: true,
  },
  invoiceStatus: {
    type: String,
    default: "Invoice sent",
  },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
