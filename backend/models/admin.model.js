import mongoose from "mongoose";
import email from "mongoose-type-email";

const adminSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
});

const Admin = new mongoose.model("Admin", adminSchema);

export default Admin;
