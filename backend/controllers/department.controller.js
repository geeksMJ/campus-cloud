import Department from "../models/department.model.js";

export const addDepartment = async (req, res) => {
  try {
    const { departmentName } = req.body;
    const department = await Department.findOne({ departmentName });
    if (department) {
      return res.status(400).json({ error: "department already exist" });
    }
    const newDepartment = new Department({
      departmentName: departmentName,
    });
    if (newDepartment) {
      await newDepartment.save();
      return res.status(200).json({ message: "department added successfully" });
    } else {
      return res.status(400).json({ error: "error in adding new department" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: "error in addDepartment controller" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { departmentName } = req.body;
    await Department.deleteOne({ departmentName });
    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ error: "error in deleteDepartment controller" });
  }
};

export const showDepartment = async (req, res) => {
  try {
    const allDepartment = await Department.find({});
    const departmentDetails = allDepartment.map((department) => ({
      departmentName: department.departmentName,
    }));
    return res.status(200).json(departmentDetails);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: "error showDepartment controller" });
  }
};
