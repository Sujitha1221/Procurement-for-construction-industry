// PurchaseRequisitionRoute.mjs

import express from 'express';

import {
  addItems,
  getAllPurchaseRequisitions,
  getPurchaseRequisitionById,
  getPurchaseRequisitionByEmpId,
  updateItems,
} from '../controllers/PurchaseRequisitionController.mjs';

const route = express.Router();

route.post("/add-items", addItems);
route.get("/get-pr-by-id/:id", getPurchaseRequisitionById);
route.get("/get-all-pr", getAllPurchaseRequisitions);
route.get("/get-pr-by-empid/:empId", getPurchaseRequisitionByEmpId);
route.put("/update-items", updateItems);

export default route;
