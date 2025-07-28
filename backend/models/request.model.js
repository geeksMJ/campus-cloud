import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    ref: "Employee",
  },
  employeeName: {
    type: String,
    required: true,
    ref: "Employee",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  courseTitle: {
    type: String,
    ref: "Course",
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  quizTitle: {
    type: String,
    ref: "Quiz",
  },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
