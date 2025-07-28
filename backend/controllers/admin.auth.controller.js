import Admin from "../models/admin.model.js";
import { createToken } from "../utils/generateToken.js";
export const adminSignup = async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword, adminConfirmPassword } =
      req.body;

    if (adminPassword !== adminConfirmPassword) {
      return res.status(400).json({ error: "password does not match!!!" });
    }
    const admin = await Admin.findOne({ adminEmail });

    if (admin) {
      return res.status(400).json({ error: "admin already exist" });
    }

    const newAdmin = new Admin({
      adminName,
      adminEmail,
      adminPassword,
    });

    if (newAdmin) {
      await newAdmin.save();

      return res.status(200).json({
        message: "signed up successfully",
        adminId: newAdmin._id,
        name: newAdmin.adminName,
        email: newAdmin.adminEmail,
        password: newAdmin.adminPassword,
      });
    } else {
      return res.status(400).json({ error: "invalid admin data" });
    }
  } catch (error) {
    console.log("Error in sign up controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const adminLogin = async (req, res) => {
  const { adminEmail, password } = req.body;
  console.log(adminEmail, password);
  try {
    const admin = await Admin.findOne({ adminEmail });

    if (!admin) {
      return res.status(400).json({ error: "Admin Not Found" });
    } else {
      if (password === admin.adminPassword) {
        const token = createToken(admin._id, "admin");

        return res.status(200).json({
          succes: true,
          token,
          message: "Logged in Succesfully",
          name: admin.adminName,
          password: password,
          email: adminEmail,
        });
      } else {
        return res.status(400).json({ error: "incorrect password" });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error in admin Login Controller" });
  }
};
