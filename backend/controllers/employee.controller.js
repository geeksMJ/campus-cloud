import Quiz from "../models/quiz.model.js";
import Employee from "../models/user.model.js";

export const showAllEmployee = async (req, res) => {
  try {
    const allEmployee = await Employee.find({});
    const employeeDetails = allEmployee.map((emp) => ({
      empId: emp.empId,
      employeeName: emp.employeeName,
      department: emp.department,
      designation: emp.designation,
      joiningDate: emp.joiningDate,
      password: emp.password,
      courses: emp.courses,
    }));
    return res.status(200).json(employeeDetails);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in showAllEmployee Controller" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.body;
    await Employee.deleteOne({ empId });
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in deleteEmployee Controller" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const {
      empId,
      employeeName,
      // designation,
      department,
      password,
      joiningDate,
      currentCourse,
    } = req.body;
    const updateEmp = {
      $set: {
        employeeName: employeeName,
        // designation: designation,
        department: department,
        password: password,
        joiningDate: joiningDate,
        currentCourse: currentCourse,
      },
    };
    await Employee.updateOne({ empId }, updateEmp);
    return res
      .status(200)
      .json({ message: "employee updated successfully", updateEmp });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in updateEmployee Controller" });
  }
};

export const assignQuiz = async(req,res)=>{
  try {
    const {empId,quizId} = req.body;
    const emp = await Employee.findOne({empId})
    if(!emp ){
      return res.status(400).json({error:"employee dont exist"})
    }
    const quiz = await Quiz.findById(quizId)
    if(!quiz){
      return res.status(400).json({error:"Quiz doesn't exist"})
    }

    emp.quizess.push(quizId)
    await emp.save();

    return res.status(200).json({ message: "Quiz assigned successfully", emp });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in assignQuiz Controller" });
  }
  }

