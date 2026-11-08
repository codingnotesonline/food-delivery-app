import mongoose from "mongoose";

const foodMenuSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },
  { collection: "FoodMenuData" }
);

const foodMenuModel =
  mongoose.models.FoodMenuData ||
  mongoose.model("FoodMenuData", foodMenuSchema);

export { foodMenuModel };
