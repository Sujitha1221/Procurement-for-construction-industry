import Payment from "../models/Payment.mjs";

// Controller function to add a payment
export const makePayment = async (req, res) => {
  try {
    const { invoiceId, orderId, item, quantity, totalAmount, CardNumber } =
      req.body;

    const dateTime = new Date();

    const payment = new Payment({
      invoiceId,
      orderId,
      item,
      quantity,
      totalAmount,
      CardNumber,
      dateTime,
    });

    await payment.save();

    res.status(201).json({ message: "Payment added successfully" });
  } catch (error) {
    console.error("Error adding payment:", error);
    res
      .status(500)
      .json({ message: "Failed to add payment", error: error.message });
  }
};
