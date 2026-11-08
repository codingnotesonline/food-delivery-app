import express from "express";
import { authenticateAdmin } from "../controllers/adminController.js";
import { authenticateToken } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", authenticateAdmin);

adminRouter.post("/verify", authenticateToken);

export { adminRouter };
