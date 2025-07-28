import Course from "../models/course.model.js";
import Video from "../models/video.model.js";
import Employee from "../models/user.model.js";
import Quiz from "../models/quiz.model.js";



export const videoTracker = async (req, res) => {
  try {
    const { videoId, empId } = req.body;
    if (!videoId || !empId) {
      return res.status(400).json({ error: "videoId and empId are required" });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(400).json({ error: "video not found" });
    }

    if (video.watchedBy.includes(empId)) {
      return res
        .status(200)
        .json({ message: "User has already watched this video" });
    }
    video.watchedBy.push(empId);
    await video.save();

    return res.status(200).json({ message: "updated succesfully", video });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error in videoTracker controller" });
  }
};

export const updateCourseStatus = async (req, res) => {
  try {
    const { courseId, userId, status } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }

    const userStatus = course.userStatus.find((us) => us.user === userId);

    if (!userStatus) {
      course.userStatus.push({ user: userId, status });
      await course.save();
      return res
        .status(200)
        .json({ message: "user enrolled in the course", course });
    } else {
      userStatus.status = status;

      await course.save();

      res
        .status(200)
        .json({ message: "Course status updated successfully", course });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "error in updateCourseStatus controller" });
  }
};

export const attemptQuiz = async (req, res) => {
  try {
    const { empId, quizId } = req.body;

    const employee = await  Employee.findOne({ empId });
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(400).json({ message: "Quiz not found" });
    }

    if (quiz.attemptedBy.includes(empId)) {
      return res.status(400).json({ message: "Quiz already attempted by this employee" });
    }

    quiz.attemptedBy.push(empId);
    await quiz.save();

    res.status(200).json({ message: "Quiz attempt recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


