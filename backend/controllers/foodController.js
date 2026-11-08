import mongoose from "mongoose";
import { foodModel } from "../models/foodModel.js";
import path from "path";
import fs from "fs";

const addFood = async (req, res) => {
  const imageName = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: imageName,
    category: req.body.category,
  });

  try {
    await food.save();
    res.status(200).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const listFood = async (req, res) => {
  try {
    const data = await foodModel.find({});
    data.forEach(
      (item) =>
        (item.image = `${req.protocol}://${req.get("host")}/images/food/${
          item.image
        }`)
    );
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const listFoodItem = async (req, res) => {
  // this is used when data is passed using a url in this format: url?key=value&key=value
  // the routing url will be simple like app.get("/search")
  // const id = req.query.id;
  const id = req.params.id;

  try {
    const item = await foodModel.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(id),
    });
    item.image = `${req.protocol}://${req.get("host")}/images/food/${
      item.image
    }`;
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const updateFood = async (req, res) => {
  const id = req.body.id;
  const imageName = req.file.filename;

  try {
    const data = await foodModel.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(id),
    });

    const response = await foodModel.updateOne(
      { _id: mongoose.Types.ObjectId.createFromHexString(id) },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: imageName,
          category: req.body.category,
        },
      }
    );

    if (response.modifiedCount == 1) {
      fs.unlinkSync(path.join("uploads/food", data.image));
      res.status(200).json({ success: true, message: "Food Updated" });
    } else {
      fs.unlinkSync(path.join("uploads/food", imageName));
      throw "Due to some error food was not updated!";
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  // createFromHexString is a static method of the ObjectId class
  try {
    const data = await foodModel.find({
      _id: mongoose.Types.ObjectId.createFromHexString(req.body.id),
    });
    const response = await foodModel.deleteOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.body.id),
    });

    if (response.deletedCount == 1) {
      // for just single item, the array of single item is returned
      fs.unlinkSync(path.join("uploads/food", data[0].image));
      res.status(200).json({ success: true, message: "Food Deleted" });
    } else {
      throw "Due to some error food was not deleted!";
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const removeFoodCategoryAll = async (req, res) => {
  try {
    const data = await foodModel.find({ category: req.body.category });
    const response = await foodModel.deleteMany({
      category: req.body.category,
    });

    if (response.deletedCount >= 1) {
      if (response.deletedCount == 1) {
        // for just single item, the array of single item is returned
        fs.unlinkSync(path.join("uploads/food", data[0].image));
      } else {
        data.forEach((item) =>
          fs.unlinkSync(path.join("uploads/food", item.image))
        );
      }
      res.status(200).json({ success: true, message: "Food's Deleted" });
    } else {
      res.status(200).json({
        success: true,
        message: "Food of the Category does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export {
  addFood,
  listFood,
  listFoodItem,
  updateFood,
  removeFood,
  removeFoodCategoryAll,
};
