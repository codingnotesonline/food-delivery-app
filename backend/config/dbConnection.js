import mongoose from "mongoose";

const dbConnection = async (dbName) => {
    mongoose.connect(`${process.env.dbURL}/${dbName}`).then(()=>{
        console.log("Database Connected");
    })
    .catch((error => {
        console.log(error.message);
    }));
}

export { dbConnection};