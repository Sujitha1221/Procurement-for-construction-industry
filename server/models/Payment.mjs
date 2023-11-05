import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
  },
  orderId: {
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
  totalAmount: {
    type: String,
    required: true,
  },
  CardNumber: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
