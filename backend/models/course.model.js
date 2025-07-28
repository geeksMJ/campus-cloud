import mongoose from "mongoose";

const coursesSchema = mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  courseDepartment: {
    type: [String], // Defines an array of strings
    required: true, // Marks this field as required
  },
  thumbnail: {
    type: String,
    required: true,
  },
  noOfModules: {
    type: Number,
  },
  userStatus: [
    {
      user: {
        type: String,
        required: true,
      },
      status: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },
    { timestamps: true },
  ],
});

const Course = mongoose.model("Course", coursesSchema);

export default Course;
