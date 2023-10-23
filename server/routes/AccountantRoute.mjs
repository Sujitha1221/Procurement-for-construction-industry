import { Router } from "express";
import {
  createAccountant,
  getAccountantByEmpId,
} from "../controllers/AccountantController.mjs";
const AccountantRouter = Router();

AccountantRouter.post("/add-details", createAccountant);
AccountantRouter.get("/get-accountant/:empId", getAccountantByEmpId);

export default AccountantRouter;
