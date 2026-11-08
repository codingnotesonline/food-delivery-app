import express from "express";
import { upload } from "../middlewares/uploadImage.js";
import { authenticateUserToken } from "../middlewares/authenticateUserToken.js";
import {
  addFood,
  listFood,
  listFoodItem,
  updateFood,
  removeFood,
  removeFoodCategoryAll,
} from "../controllers/foodController.js";

const foodRouter = new express.Router();

foodRouter.post("/add", authenticateUserToken, upload, addFood);

foodRouter.get("/list", listFood);

foodRouter.get("/list/item/:id", listFoodItem);

foodRouter.put("/update", authenticateUserToken, upload, updateFood);

foodRouter.delete("/remove", authenticateUserToken, removeFood);

foodRouter.delete("/removecategoryall", authenticateUserToken, removeFoodCategoryAll);

export { foodRouter };
