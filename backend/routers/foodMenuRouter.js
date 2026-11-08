import express from "express";
import { upload } from "../middlewares/uploadImage.js";
import { authenticateUserToken } from "../middlewares/authenticateUserToken.js";
import {
  addFoodMenu,
  listFoodMenu,
  listFoodMenuItem,
  updateFoodMenu,
  removeFoodMenu,
} from "../controllers/foodMenuController.js";

const foodMenuRouter = new express.Router();

foodMenuRouter.post("/add", authenticateUserToken, upload, addFoodMenu);

foodMenuRouter.get("/list", listFoodMenu);

foodMenuRouter.get("/list/item/:id", listFoodMenuItem);

foodMenuRouter.put("/update", authenticateUserToken, upload, updateFoodMenu);

foodMenuRouter.delete("/remove", authenticateUserToken, removeFoodMenu);

export { foodMenuRouter };
