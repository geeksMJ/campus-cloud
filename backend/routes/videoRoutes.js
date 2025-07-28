import express from "express";
import {
  addVideo,
  allVideo,
  getVideosByCourseId,
} from "../controllers/course.controller.js";
import { uploadVideo } from "../middleware/uploadFileMiddleware.js";


const videoRouter = express.Router();

videoRouter.post("/addVideo", uploadVideo.single("videoLink"), addVideo);
videoRouter.get("/allVideo", allVideo);
videoRouter.get("/getVideosBycourseId/:_id", getVideosByCourseId);

export default videoRouter;
