import Route from "express";
import {
  generateInvoice,
  getInvoicesByAccountant,
  updateStatus,
  getInvoiceDetailsById,
} from "../controllers/InvoiceController.mjs";

const InvoiceRouter = Route();

InvoiceRouter.post("/add-invoice", generateInvoice);
InvoiceRouter.get("/get-invoices/:accountantId", getInvoicesByAccountant);
InvoiceRouter.put("/update-invoice-status/:invoiceId", updateStatus);
InvoiceRouter.get("/get-invoice-id/:invoiceId", getInvoiceDetailsById);

export default InvoiceRouter;
