import mongoose from "mongoose";

const authenticationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {collection: "UserAccount"});

const authenticationModel = mongoose.models.UserAccount || mongoose.model("UserAccount", authenticationSchema);

export { authenticationModel };