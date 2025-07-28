import Request from "../models/request.model.js";
import Employee from "../models/user.model.js";
import Course from "../models/course.model.js";
import Quiz from "../models/quiz.model.js";

// Controller to add a new request
export const addRequest = async (req, res) => {
  try {
    const { empId, courseId, quizId } = req.body;

    // Find the employee by empId
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    // Handle course request
    if (courseId && !quizId) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(400).json({ message: "Course not found" });
      }

      const existingRequest = await Request.findOne({
        empId: employee.empId,
        courseId: course._id,
      });
      if (existingRequest) {
        return res.status(400).json({
          message: "Request for this employee and course already exists",
        });
      }

      const newRequest = new Request({
        empId: employee.empId,
        employeeName: employee.employeeName,
        courseId: course._id,
        courseTitle: course.courseTitle,
      });

      await newRequest.save();
      return res.status(200).json({
        message: "Course request created successfully",
        data: newRequest,
      });
    }

    // Handle quiz request
    if (quizId && !courseId) {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(400).json({ message: "Quiz not found" });
      }

      const existingRequest = await Request.findOne({
        empId: employee.empId,
        quizId: quiz._id,
      });
      if (existingRequest) {
        return res.status(400).json({
          message: "Request for this employee and quiz already exists",
        });
      }

      const newRequest = new Request({
        empId: employee.empId,
        employeeName: employee.employeeName,
        quizId: quiz._id,
        quizTitle: quiz.title,
      });

      await newRequest.save();
      return res.status(200).json({
        message: "Quiz request created successfully",
        data: newRequest,
      });
    }

    return res.status(400).json({ message: "Invalid request parameters" });
  } catch (error) {
    console.error("Error adding request:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllRequest = async (req, res) => {
  try {
    const request = await Request.find();

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res
      .status(200)
      .json({ message: "Request deleted successfully", data: deletedRequest });
  } catch (error) {
    console.error("Error deleting request:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
