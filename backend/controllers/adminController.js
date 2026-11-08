import { adminModel } from "../models/adminModel.js";
import jsonwebtoken from "jsonwebtoken";

const authenticateToken = (req, res) => {
  const data = req.headers.authorization;

  const token = data.split(" ")[1];
  const verification = jsonwebtoken.verify(
    token,
    process.env.JWT_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        res.status(404).json({ success: false, message: "User not Verified" });
      } else {
        res
          .status(200)
          .json({ success: true, message: `Welcome ${decoded.name}` });
      }
    }
  );
};

const authenticateAdmin = async (req, res) => {
  const adminDetails = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const data = await adminModel.find(adminDetails);
    if (data.length == 0) {
      throw "User was not found in the database";
    } else {
      const adminData = {
        name: data[0].name,
        username: data[0].username,
        password: data[0].password,
      };

      const token = jsonwebtoken.sign(adminData, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });                                                     
      res.status(200).json({
        success: true,
        message: `Welcome ${data[0].name}`,
        token: token,
      });                               
    }
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "User is not Authenticated" });
  }
};

export { authenticateToken, authenticateAdmin };
