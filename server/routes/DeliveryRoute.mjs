import express from 'express';

import {
  createDelivery,
  getAllDeliveries,
} from '../controllers/DeliveryController.mjs';

const route = express.Router();

// Create a new delivery
route.post("/", createDelivery);

// Get all deliveries
route.get("/", getAllDeliveries);

export default route;
