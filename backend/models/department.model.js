import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Department = new mongoose.model("Department", departmentSchema);

export default Department;
