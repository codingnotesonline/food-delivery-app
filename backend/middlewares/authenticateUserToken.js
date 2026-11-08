import jsonwebtoken from "jsonwebtoken";

const authenticateUserToken = (req, res, next) => {
    const data = req.headers.authorization;

    if(data == null || data == undefined){
        res.status(200).json({success: false, message: "User not Verified"});
    }

    const token = data.split(" ")[1];
    jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            res.status(200).json({success: false, message: "User not Verified"});
        }
        else{
            next();
        }
    });
}

export { authenticateUserToken };
