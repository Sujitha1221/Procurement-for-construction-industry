import Delivery from '../models/Delivery.mjs'; // Import the Delivery model

// Create a new delivery
export const createDelivery = async (req, res) => {
  try {
    const { purchaseRef, status, concern } = req.body;

    // Create a new delivery
    const delivery = new Delivery({ purchaseRef, status, concern });
    await delivery.save();

    res.status(201).json(delivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all deliveries
export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
