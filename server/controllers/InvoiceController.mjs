import Invoice from "../models/Invoice.mjs";

export const createInvoice = async (req, res) => {
  const {
    orderId,
    empId,
    item,
    quantity,
    pricePerUnit,
    totalAmount,
    accountantId,
    accountantEmail,
  } = req.body;

  try {
    const newInvoice = new Invoice({
      orderId,
      empId,
      item,
      quantity,
      pricePerUnit,
      totalAmount,
      accountantId,
      accountantEmail,
      dateTime: new Date(),
    });

    const savedInvoice = await newInvoice.save();
    res.json(savedInvoice);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
