import Employee from "../models/user.model.js";
import { createToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { empId, password } = req.body;
    console.log(empId, password);
    const emp = await Employee.findOne({ empId });

    if (!emp) {
      console.log("not found emp id");
      return res.status(400).json({ error: "Employee not found" });
    }

    if (password !== emp.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = createToken(emp._id, "user");
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createEmploye = async (req, res) => {
  const {
    employeeName,
    empId,
    // designation,
    department,
    password,
    joiningDate,
  } = req.body;
  try {
    console.log("Create Employe Body", req.body);
    if (
      !employeeName ||
      !empId ||
      // !designation ||
      !department ||
      !password ||
      !joiningDate
    ) {
      console.log("Field Missing", {
        employeeName,
        empId,
        designation,
        department,
        password,
        joiningDate,
      });
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const exists = await Employee.findOne({ empId });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, error: "Student already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter a strong password" });
    }
    const newEmployee = new Employee({
      employeeName,
      empId,
      // designation,
      department,
      password,
      joiningDate,
    });
    await newEmployee.save();
    res
      .status(200)
      .json({ success: true, message: "Student Added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
