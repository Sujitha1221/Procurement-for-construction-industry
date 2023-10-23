import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import databaseConnection from "./config/database.mjs";
import logger from "./utils/logger.mjs";
import PurchaseRequisitionRoute from "./routes/PurchaseRequisitionRoute.mjs";
import UserRouter from "./routes/UserRoute.mjs";
import LoginRouter from "./routes/LoginRoute.mjs";
import OrderRouter from "./routes/OrderRoute.mjs";
import AccountantRouter from "./routes/AccountantRoute.mjs";
import InvoiceRouter from "./routes/InvoiceRoute.mjs";
import PaymentRouter from "./routes/PaymentRoute.mjs";
import SiteManagerRoute from './routes/SiteManagerRoute.mjs'
import ProjectRoute from './routes/ProjectRoute.mjs'
import DeliveryRoute from './routes/DeliveryRoute.mjs'
import ItemRoute from './routes/ItemRoute.mjs'

const app = express();
const PORT = process.env.PORT || "8080";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());

app.use("/purchase-requisition", PurchaseRequisitionRoute);
app.use("/login", LoginRouter);
app.use("/user", UserRouter);
app.use("/order", OrderRouter);
app.use("/accountant", AccountantRouter);
app.use("/invoice", InvoiceRouter);
app.use("/payment", PaymentRouter);
app.use("/site-manager",SiteManagerRoute);
app.use('/project',ProjectRoute);
app.use("/delivery", DeliveryRoute)
app.use('/item',ItemRoute);

app.listen(PORT, () => {
  logger.info(`Server is up and running on port ${PORT}`);
  databaseConnection();
});
