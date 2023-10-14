import Route from "express";
import { createInvoice } from "../controllers/InvoiceController.mjs";

const InvoiceRouter = Route();

InvoiceRouter.post("/add-invoice", createInvoice);

export default InvoiceRouter;
