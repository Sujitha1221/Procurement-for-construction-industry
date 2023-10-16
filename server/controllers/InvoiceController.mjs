import Invoice from "../models/Invoice.mjs";

export const generateInvoice = async (req, res) => {
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
      issuedDate: new Date(),
    });

    const savedInvoice = await newInvoice.save();
    res.json(savedInvoice);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const getInvoicesByAccountant = async (req, res) => {
  const accountantId = req.params.accountantId;

  try {
    const orders = await Invoice.find({ accountantId: accountantId });

    if (orders.length > 0) {
      console.log({ status: "Success", orders });
      res.json(orders);
    } else {
      res
        .status(404)
        .json({ status: "Error", message: "No orders found for the supplier" });
    }
  } catch (err) {
    console.log({ status: "Error", err });
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { invoiceStatus } = req.body;

    // Update the invoice status
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { invoiceStatus },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error("Error updating invoice status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getInvoiceDetailsById = async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log({ status: "Success", invoice });
    res.json(invoice);
  } catch (error) {
    console.log({ status: "Error", error });
    return res.status(500).json({ message: "Internal server error" });
  }
};
