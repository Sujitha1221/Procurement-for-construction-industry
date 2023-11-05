// Import the 'express' framework and the required controller functions from the specified paths.
import express from "express";
import { addItems, getAllItems } from "../controllers/ItemController.mjs";

// Create an instance of an Express Router.
const route = express.Router();

// Define routes for adding and retrieving items.

// Route to add items, using the 'addItems' controller function.
route.post("/add-items", addItems);

// Route to get all items, using the 'getAllItems' controller function.
route.get("/get-items", getAllItems);

// Export the router to be used by the application.
export default route;
