import { authenticationModel } from "../models/authenticationModel.js";
import jsonwebtoken from "jsonwebtoken";

const createUser = (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };req.body.id
    const user = new authenticationModel(userData);

    const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET_KEY, {"expiresIn": "3d"});

    try {
        user.save();
        res.status(200).json({success: true, message: "User created successfully", token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error, User was not created"});
    }
}

const authenticateToken = (req, res) => {
    const data = req.headers.authorization;

    const token = data.split(" ")[1];
    const verification = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            res.status(200).json({success: false, message: "User not Verified"});
        }
        else{
            res.status(200).json({success: true, message: `Welcome ${decoded.name}`});
        }
    });
}

const authenticateUser = async (req, res) => {
    const userDetails = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        const data = await authenticationModel.find(userDetails);
        if(data.length == 0){
            throw "User is not present in the database";
        }
        else{
            const userData = {
                name: data[0].name,
                email: data[0].email,
                password: data[0].password
            }

            const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET_KEY, {"expiresIn": "3d"});
            res.status(200).json({success: true, message: `Welcome ${userData.name}`, token: token});
        }
    } catch (error) {
        console.log(error);
        res.json(404).json({success: false, message: "User is not present in the database"});
    }
}

export { createUser, authenticateToken, authenticateUser };