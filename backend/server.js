import cors from "cors";
import dotenv from "dotenv";
import express, { application } from "express";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import videoRouter from "./routes/videoRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import addRouter from "./routes/requestRoutes.js";

import departmentRoutes from "./routes/departmentRoutes.js";

const app = express();
const port = process.env.PORT || 6300;
dotenv.config();

// DB connection
connectDB();

app.use(express.json());

// const allowedOrigins = ["https://www.mediversal-gurukul.netlify.app"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests with no origin (e.g. mobile apps or Postman)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   optionsSuccessStatus: 200
// };

app.use(cors());
// Serve static files from the uploads directory
app.use("/thumbnail", express.static("uploads"));
app.use("/video", express.static("videos"));

app.use("/api/auth", authRoutes);
app.use("/api/video", videoRouter);
app.use("/api/course", courseRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/request", addRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
