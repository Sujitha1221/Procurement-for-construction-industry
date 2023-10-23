// Import the 'Item' model and 'logger' utility from the specified paths.
import Item from "../models/Item.mjs";
import logger from "../utils/logger.mjs";

// Define an asynchronous function to add items to the database.
export const addItems = async (req, res) => {
  // Destructure 'itemName' and 'unitPrice' from the request body.
  const { itemName, unitPrice } = req.body;

  try {
    // Create a new item in the database with the provided 'itemName' and 'unitPrice'.
    const item = await Item.create({
      itemName,
      unitPrice,
    });

    // Respond with the created item in JSON format.
    res.json(item);

    // Log a success message indicating that the item was added successfully.
    logger.info("Item added successfully");
  } catch (err) {
    // If an error occurs during the item creation, log the error and respond with an error message.
    console.log({ status: "Error", err });
    logger.error(`Error creating item: ${err.message}`);
  }
};

// Define an asynchronous function to retrieve all items from the database.
export const getAllItems = async (req, res) => {
  try {
    // Find all items in the database and store them in the 'items' variable.
    const items = await Item.find();

    // Respond with a status code of 200 and the retrieved items in JSON format.
    res.status(200).json(items);

    // Log a success message indicating that the item details were fetched.
    logger.info("Item details fetched");
  } catch (error) {
    // If an error occurs during item retrieval, log the error and respond with a 500 Internal Server Error.
    logger.error(`Error getting all items: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
