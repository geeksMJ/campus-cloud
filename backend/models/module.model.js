import mongoose from "mongoose";

const modulesSchema = mongoose.Schema({
  moduleName: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  video: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  ],
  moduleNo: {
    type: Number,
    required: true,
  },
});

const Module = new mongoose.model("Module", modulesSchema);

export default Module;
