import express from "express";
import {
  addDepartment,
  deleteDepartment,
  showDepartment,
} from "../controllers/department.controller.js";

const router = express.Router();

router.post("/addDepartment", addDepartment);
router.post("/deleteDepartment", deleteDepartment);
router.get("/showDepartment", showDepartment);

export default router;
