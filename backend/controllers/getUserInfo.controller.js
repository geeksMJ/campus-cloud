import jwt from "jsonwebtoken";
import Employee from "../models/user.model.js";
export const getUserInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    const userId = decoded.id;

    const user = await Employee.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { empId } = req.params;
    const emp = await Employee.findOne({ empId });
    if (!emp) {
      return res.status(400).json({ error: "employee not found" });
    }

    return res.status(200).json({
      success: true,
      message: "successful",
      emp,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in getEmployeeById Controller" });
  }
};
