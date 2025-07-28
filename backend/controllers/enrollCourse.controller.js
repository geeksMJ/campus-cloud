import Course from "../models/course.model.js";
import Employee from "../models/user.model.js";

export const assignCourse = async (req, res) => {
  try {
    const { empId, courseId } = req.body;
    console.log("Employee ID:", empId, "Received course ID:", courseId);

    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    }

    if (!employee.courses.includes(courseId)) {
      employee.courses.push(courseId);
      await employee.save();
      return res.status(200).json({ message: "Course assigned successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Course already assigned to the employee" });
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while assigning the course" });
  }
};

export const excludingDepartment = async (req, res) => {
  try {
    const { empId } = req.params;
    console.log("excludingDepartment ", empId);
    const employee = await Employee.findOne({ empId }).select([
      "department",
      "courses",
    ]);


    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }


    const departmentName = employee.department;

    const courses = await Course.find({
      _id: { $nin: employee.courses },
      $and: [
        { courseDepartment: { $ne: departmentName } },
        { courseDepartment: { $ne: "all_department" } },
      ],
    });

 

    return res.status(200).json(courses);
  } catch (error) {
    // Log the error and return a 500 error with the error message
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

