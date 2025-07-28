import express from "express";
import {
  attemptQuiz,
  updateCourseStatus,
  videoTracker,
} from "../controllers/track.controller.js";

const router = express.Router();

router.post("/watchedBy", videoTracker);
router.post("/courseStatus", updateCourseStatus);
router.post('/attemp-Quiz',attemptQuiz)

export default router;
