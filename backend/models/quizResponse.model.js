import mongoose from "mongoose";

const quizResponseSchema = mongoose.Schema({

  empId: {
    type: String,
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  answers: {
    type: [mongoose.Schema.Types.Mixed],
  },

  result: {
    type: String,
    enum: ["Not Checked", "Passed", "Failed"],
    default: "Not Checked",
  },
});

const QuizResponse = new mongoose.model("QuizResponse", quizResponseSchema);

export default QuizResponse;

