import express from "express";
import {
  addRequest,
  deleteRequest,
  getAllRequest,
} from "../controllers/request.controller.js";

const addRouter = express.Router();

addRouter.post("/addRequest", addRequest);
addRouter.get("/getRequest", getAllRequest);
addRouter.delete("/deleteRequest/:id", deleteRequest);

export default addRouter;
