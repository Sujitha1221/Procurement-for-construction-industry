import Item from "../models/Item.mjs";

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