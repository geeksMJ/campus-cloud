import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
      required: true,
      unique: true,
    },
    // designation: {
    //   type: String,
    //   required: true,
    // },
    department: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    currentCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    quizess: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        default:[]
      },
    ],
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
