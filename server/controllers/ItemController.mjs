import Item from "../models/Item.mjs";
import logger from "../utils/logger.mjs";

export const addItems = async (req, res) => {
  const { itemName,unitPrice } = req.body;

  try {
    const item = await Item.create({
      itemName,
      unitPrice
    });
    console.log({ status: "Success", item });
    res.json(item);
  } catch (err) {
    console.log({ status: "Error", err });
  }
};

export const getAllItems = async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
      logger.info(`Item details fetched`);
    } catch (error) {
      logger.error(`Error getting all items ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  };
  