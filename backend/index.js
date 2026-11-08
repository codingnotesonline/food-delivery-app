import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { foodRouter } from "./routers/foodRouter.js";
import { dbConnection } from "./config/dbConnection.js";
import { authenticationRouter } from "./routers/authenticationRouter.js";
import { adminRouter } from "./routers/adminRouter.js";
import { foodMenuRouter } from "./routers/foodMenuRouter.js";

config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: process.env.ALLOWED_CROSS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/food", foodRouter);
app.use("/api/authentication", authenticationRouter);
app.use("/api/admin", adminRouter);
app.use("/api/foodmenu", foodMenuRouter);
app.use("/images/food", express.static("uploads/food"));
app.use("/images/foodmenu", express.static("uploads/foodMenu"));

// db connection
dbConnection("food-delivery-app");

app.listen(port, () => {
  console.log("Connection Established");
});
