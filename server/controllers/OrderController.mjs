
import Order from "../models/Order.mjs";

export const addItems = async (req, res) => {
  const { purchaseRequisition, supplier } = req.body;

  try {
    const order = await Order.create({
      purchaseRequisition,
      supplier,
    });
    console.log({ status: "Success", order });
    res.json(order);
  } catch (err) {
    console.log({ status: "Error", err });
  }
};

export const getOrdersBySupplier = async (req, res) => {
  const supplierId = req.params.supplierId;

  try {
    const orders = await Order.find({ supplier: supplierId }).populate(
      "purchaseRequisition"
    );

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
    const orderId = req.params.orderId;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId).populate("purchaseRequisition");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log({ status: "Success", order });
    res.json(order);
  } catch (error) {
    console.log({ status: "Error", error });
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId, "orderStatus");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log({ status: "Success", orderStatus: order.orderStatus });
    res.json({ orderStatus: order.orderStatus });
  } catch (error) {
    console.log({ status: "Error", error });
    return res.status(500).json({ message: "Internal server error" });
  }
};
