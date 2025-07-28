import express from "express";
// import cors from "cors";
import { login, createEmploye } from "../controllers/auth.controllers.js";
import {
  adminChangePassword,
  changePassword,
} from "../controllers/changePassword.controller.js";
import {
  adminLogin,
  adminSignup,
} from "../controllers/admin.auth.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";
import { getUserInfo } from "../controllers/getUserInfo.controller.js";
import { verifyToken } from "../controllers/verifyToken.controller.js";
const router = express.Router();

// const corsOptions = {
//   origin: 'https://www.mediversal-gurukul.netlify.app',
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",//(https://your-client-app.com)
//   optionsSuccessStatus: 200,
// };
// router.use(cors(corsOptions));

router.post("/login", login);
router.get("/verifyToken", verifyToken);
router.post("/changePassword", changePassword);
router.post("/adminChangePassword", adminChangePassword);
router.post("/adminLogin", adminLogin);
router.post("/getUserInfo", authenticateToken, getUserInfo);
router.post("/employeeSignup", createEmploye);
router.post("/adminSignup", adminSignup);

export default router;
