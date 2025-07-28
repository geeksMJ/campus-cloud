import mongoose from "mongoose";

const quizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
    department: [
      {
        type: String,
      },
    ],
    questions: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    attemptedBy: {
      type: [String],
      default: [],
    },
    passedBy: {
      type: [String],
      default: [],
    },
    requestedBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model(" Quiz", quizSchema);

export default Quiz;
