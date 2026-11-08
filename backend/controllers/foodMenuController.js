import mongoose, { mongo } from "mongoose";
import { foodMenuModel } from "../models/foodMenuModel.js";
import path from "path";
import fs from "fs";

const addFoodMenu = async (req, res) => {
  const imageName = req.file.filename;

  const foodMenu = new foodMenuModel({
    name: req.body.name,
    image: imageName,
  });

  try {
    await foodMenu.save();
    res.status(200).json({ success: true, message: "FoodMenu Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const listFoodMenu = async (req, res) => {
  try {
    const data = await foodMenuModel.find({});
    data.forEach(
      (item) =>
        (item.image = `${req.protocol}://${req.get("host")}/images/foodmenu/${
          item.image
        }`)
    );
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const listFoodMenuItem = async (req, res) => {
  // this is used when data is passed using a url in this format: url?key=value&key=value
  // the routing url will be simple like app.get("/search")
  // const id = req.query.id;
  const id = req.params.id;

  try {
    const item = await foodMenuModel.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(id),
    });
    item.image = `${req.protocol}://${req.get("host")}/images/foodmenu/${
      item.image
    }`;
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const updateFoodMenu = async (req, res) => {
  const id = req.body.id;
  const imageName = req.file.filename;

  try {
    const data = await foodMenuModel.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(id),
    });

    const response = await foodMenuModel.updateOne(
      { _id: mongoose.Types.ObjectId.createFromHexString(id) },
      {
        $set: {
          name: req.body.name,
          image: imageName,
        },
      }
    );

    if (response.modifiedCount == 1) {
      fs.unlinkSync(path.join("uploads/foodMenu", data.image));
      res.status(200).json({ success: true, message: "FooMenu Updated" });
    } else {
      fs.unlinkSync(path.join("uploads/foodMenu", imageName));
      throw "Due to some error foodMenu was not updated!";
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const removeFoodMenu = async (req, res) => {
  // createFromHexString is a static method of the ObjectId class
  try {
    const data = await foodMenuModel.find({
      _id: mongoose.Types.ObjectId.createFromHexString(req.body.id),
    });
    const response = await foodMenuModel.deleteOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.body.id),
    });

    if (response.deletedCount == 1) {
      // for just single item, the array of single item is returned because find is used; if findOne is used then only a single object is returned
      fs.unlinkSync(path.join("uploads/foodMenu", data[0].image));
      res.status(200).json({ success: true, message: "FoodMenu Deleted" });
    } else {
      throw "Due to some error foodMenu was not deleted!";
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export {
  addFoodMenu,
  listFoodMenu,
  listFoodMenuItem,
  updateFoodMenu,
  removeFoodMenu,
};
