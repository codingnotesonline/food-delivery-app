import express from "express";
import { createUser, authenticateToken, authenticateUser } from "../controllers/authenticationController.js";

const authenticationRouter = express.Router();

authenticationRouter.post("/login", authenticateUser);

authenticationRouter.post("/signup", createUser);

authenticationRouter.post("/verify", authenticateToken);

export { authenticationRouter };