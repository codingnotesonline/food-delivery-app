import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "AdminAccount" }
);

const adminModel =
  mongoose.models.AdminModel || mongoose.model("AdminAccount", adminSchema);

export { adminModel };
