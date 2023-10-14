// PurchaseRequisitionRoute.mjs

import express from 'express';

import {
  addProject,
  getProjectByEmpId,
} from '../controllers/ProjectController.mjs';

const route = express.Router();

route.post("/add-project", addProject);
route.get("/get-project-by-empid/:empId", getProjectByEmpId);

export default route;
