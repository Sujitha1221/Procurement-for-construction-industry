// PurchaseRequisitionController.mjs

// Import the 'PurchaseRequisition' model and 'logger' utility from the specified paths.
import PurchaseRequisition from "../models/PurchaseRequisition.mjs";
import logger from "../utils/logger.mjs";

// Define an asynchronous function to add a purchase requisition to the database.
export const addItems = async (req, res) => {
  // Destructure request data, including 'empId', 'item', 'projectName', 'quantity', 'unitPrice', and 'totalAmount'.
  const { empId, item, projectName, quantity, unitPrice, totalAmount } =
    req.body;

  // Set the initial 'approvalStatus' to "Pending".
  const approvalStatus = "Pending";

  try {
    // Create a new purchase requisition in the database with the provided data and 'dateTime' as the current date.
    const purchaseRequisition = await PurchaseRequisition.create({
      empId,
      item,
      projectName,
      quantity,
      unitPrice,
      totalAmount,
      approvalStatus,
      dateTime: new Date(),
    });

    // Log a success message indicating that the purchase requisition was added, and respond with the created requisition data.
    logger.info("Added Purchase Requisition");
    res.json(purchaseRequisition);
  } catch (err) {
    // If an error occurs during purchase requisition creation, log the error.
    logger.error(`Error creating purchase requisition: ${err.message}`);
  }
};

// Define an asynchronous function to retrieve all purchase requisitions from the database.
export const getAllPurchaseRequisitions = async (req, res) => {
  try {
    // Find and retrieve all purchase requisitions from the database.
    const purchaseRequisitions = await PurchaseRequisition.find();

    // Log a success message indicating that the purchase requisitions were fetched and respond with the retrieved data.
    logger.info("Purchase requisitions fetched");
    res.json(purchaseRequisitions);
  } catch (err) {
    // If an error occurs during purchase requisition retrieval, log the error.
    logger.error(`Error fetching purchase requisitions: ${err.message}`);
  }
};

// Define an asynchronous function to retrieve a purchase requisition by its ID.
export const getPurchaseRequisitionById = async (req, res) => {
  // Destructure the purchase requisition ID from the request parameters.
  const { _id } = req.params;

  try {
    // Find and retrieve a purchase requisition by its ID.
    const purchaseRequisition = await PurchaseRequisition.findById(_id);

    // Log a success message indicating that the purchase requisition was fetched and respond with the retrieved data.
    logger.info("Purchase requisition fetched");
    res.json(purchaseRequisition);
  } catch (err) {
    // If an error occurs during purchase requisition retrieval, log the error.
    logger.error(`Error fetching purchase requisition: ${err.message}`);
  }
};

// Define an asynchronous function to update the 'approvalStatus' of a purchase requisition by its ID.
export const updateItems = async (req, res) => {
  // Destructure the purchase requisition ID and 'approvalStatus' from the request body.
  const { _id, approvalStatus } = req.body;

  try {
    // Find the purchase requisition by its ID.
    const purchaseRequisition = await PurchaseRequisition.findById(_id);

    if (!purchaseRequisition) {
      // If no purchase requisition is found, respond with a message and log it.
      res.json({ status: "No purchase requisition found" });
      logger.info("No purchase requisition found");
    } else {
      // Update the 'approvalStatus' and 'lastModifiedDateTime' and save the changes.
      purchaseRequisition.approvalStatus = approvalStatus;
      purchaseRequisition.lastModifiedDateTime = new Date();

      const updatedPurchaseRequisition = await purchaseRequisition.save();

      // Respond with the updated purchase requisition data.
      res.json(updatedPurchaseRequisition);
    }
  } catch (err) {
    // If an error occurs during the update, log the error.
    console.log({ status: "Error", err });
  }
};

// Define an asynchronous function to retrieve purchase requisitions by 'empId'.
export const getPurchaseRequisitionByEmpId = async (req, res) => {
  // Destructure 'empId' from the request parameters.
  const { empId } = req.params;

  try {
    // Find and retrieve purchase requisitions that match the provided 'empId'.
    const purchaseRequisitions = await PurchaseRequisition.find({
      empId: empId,
    });

    if (!purchaseRequisitions || purchaseRequisitions.length === 0) {
      // If no purchase requisitions are found, log a message and respond with an empty JSON array.
      logger.info("No purchase requisitions found");
      return res.json([]); // Return an empty JSON array
    } else {
      // Log a success message indicating that purchase requisitions were fetched and respond with the retrieved data.
      logger.info("Fetched Purchase requisitions");
      return res.json(purchaseRequisitions);
    }
  } catch (err) {
    // If an error occurs during purchase requisition retrieval, log the error and respond with a 500 Internal Server Error.
    logger.error(`Error fetching purchase requisitions: ${err.message}`);
    return res.status(500).json({ status: "Error", err });
  }
};
