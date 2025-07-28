import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getAllResponse,
  getQuizById,
  getQuizByModuleId,
  getResponseByResponseId,
  quizResponse,
  updateQuiz,
  quizAttempt,
  requestedQuiz,
  reAttempting,
  getQuizByDepartment,
} from "../controllers/quiz.controller.js";
import { quizByCourseId } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/createQuiz", createQuiz);
router.post("/updateQuiz", updateQuiz);
router.delete("/deleteQuiz/:id", deleteQuiz);
router.get("/getQuizByModuleId/:moduleId", getQuizByModuleId);
router.get("/getAllQuiz", getAllQuiz);
router.get("/getQuizById/:id", getQuizById);
router.get("/getAllResponse", getAllResponse);
router.get("/getResponseByResponseId/:id", getResponseByResponseId);
router.get("/getAllResponse/:quizId", getAllResponse);
router.post("/quizResponse", quizResponse);
router.get("/quizByCourseId/:courseId", quizByCourseId);
router.get("/getQuizByDepartment/:department", getQuizByDepartment);
router.get("/requestQuiz", requestedQuiz);

router.post("/quizAttempt", quizAttempt);
router.post("/reattempt",reAttempting)

export default router;
