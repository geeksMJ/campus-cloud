/* eslint-disable no-unused-vars */
import { FaPlusCircle, FaUserPlus, FaQuestionCircle } from "react-icons/fa";
import AdminDashboardCard from "../components/dashboard/AdminDashboardCard";
import AdminDashboardPercent from "../components/dashboard/AdminDashboardPercent";
import { useNavigate } from "react-router-dom";
import { useAllCourse } from "../components/courses/useAllCourse";
import { useAllEmployee } from "../components/settings/useAllEmployee";
import Spinner from "../../Common/Ui/Spinner";
import CourseDropdown from "../ui/CourseDropDown";
import { useState } from "react";
import { useQuizByCourseId } from "../components/quiz/useQuizByCourseId";
import MyBarChart from "../components/Chart/BarChart";
import MyPieChart from "../components/Chart/PieChart";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isLoading: loadindCourses, allCourse } = useAllCourse();
  const { isLoading: loadingAllEmployee, allEmployee } = useAllEmployee();
  const [selectedOption, setSelectedOption] = useState();
  const { isLoading: loadingQuizs, quizs } = useQuizByCourseId(
    selectedOption || null
  );

  if (loadindCourses || loadingAllEmployee) return <Spinner />;

  const courseCount = allCourse ? allCourse.length : 0;
  const employeeCount = allEmployee ? allEmployee.length : 0;

  let usersWithStatus100;
  let usersWithStatusLessThan100;
  if (selectedOption) {
    const foundCourse = allCourse.find(
      (course) => course._id === selectedOption
    );
    usersWithStatus100 = foundCourse.userStatus.filter(
      (user) => user.status === 100
    ).length;
    usersWithStatusLessThan100 = foundCourse.userStatus.filter(
      (user) => user.status < 100
    ).length;
  }

  const passedBySet = new Set();
  quizs?.forEach((quiz) =>
    quiz.passedBy.forEach((empId) => passedBySet.add(empId))
  );
  const allPassedEmployees = Array.from(passedBySet);
  const employeesPassedAllQuizzes = allPassedEmployees.filter((empId) =>
    quizs?.every((quiz) => quiz.passedBy.includes(empId))
  );

  const allAttemptedBy = quizs?.flatMap((quiz) => quiz.attemptedBy);
  const uniqueAttemptedBy = new Set(allAttemptedBy);
  const uniqueAttemptedByArray = Array.from(uniqueAttemptedBy);

  const attemptedBySet = new Set();
  quizs?.forEach((quiz) =>
    quiz.attemptedBy.forEach((empId) => attemptedBySet.add(empId))
  );

  const passeBySet = new Set();
  quizs?.forEach((quiz) =>
    quiz.passedBy.forEach((empId) => passeBySet.add(empId))
  );

  const attemptedByArray = Array.from(attemptedBySet);
  const passedByArray = Array.from(passeBySet);

  const attemptedNotPassed = attemptedByArray.filter(
    (empId) => !passedByArray.includes(empId)
  );

  const data = [
    {
      name: "completed",
      percent: Math.round((usersWithStatus100 / employeeCount) * 100),
    },
    {
      name: "currently doing",
      percent: Math.round((usersWithStatusLessThan100 / employeeCount) * 100),
    },
    {
      name: "not started",
      percent: Math.round(
        ((employeeCount - usersWithStatus100 - usersWithStatusLessThan100) /
          employeeCount) *
          100
      ),
    },
    {
      name: "passed all quizzes",
      percent: Math.round(
        (employeesPassedAllQuizzes.length / employeeCount) * 100
      ),
    },
    {
      name: "failed a quiz",
      percent: Math.round(
        ((employeeCount - attemptedNotPassed.length) / employeeCount) * 100
      ),
    },
    {
      name: "not started Quiz",
      percent: Math.round(
        (uniqueAttemptedByArray.length / employeeCount) * 100
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white p-4 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="space-x-4 space-y-2 md:space-x-4 md:space-y-0 text-sm flex flex-row md:flex-row mt-0 pt-0">
          <button
            onClick={() => {
              navigate("/admin/addCourse");
            }}
            className="text-blue-600 flex items-center"
          >
            <FaPlusCircle className="mr-2" /> Add Course
          </button>
          <button
            onClick={() => {
              navigate("/admin/employeeSignUp");
            }}
            className="text-green-600 flex items-center"
          >
            <FaUserPlus className="mr-2" /> Add Student
          </button>
          <button
            onClick={() => {
              navigate("/admin/quizzes/createQuiz");
            }}
            className="text-purple-600 flex items-center"
          >
            <FaQuestionCircle className="mr-2" /> Create Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <AdminDashboardCard
          title="Total Courses"
          number={courseCount}
          color="bg-green-300"
        />
        <AdminDashboardCard
          title="Assigned Courses"
          number="5"
          color="bg-amber-200"
        />
        <AdminDashboardCard
          title="Total Students"
          number={employeeCount}
          color="bg-fuchsia-300"
        />
      </div>

      <div className="shadow-md rounded-lg my-4 mb-6">
        <CourseDropdown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      <div className="bg-gray-50 h-auto shadow-md rounded-lg p-4 mb-6">
        <div className="w-full flex pt-4">
          <h1 className="md:text-3xl font-bold  bg-blue-600 text-white pr-8 pl-2 shadow shadow-black py-1 mb-4 rounded-r-full">
            Compliance Matrics
          </h1>
        </div>

        <div className="bg-gray-100 h-auto mb-4 flex py-2 px-2 rounded-lg  w-full">
          <div className="w-1/2 mr-1">
            <MyPieChart data={data} />
          </div>
          <div className="w-1/2 mr-1">
            <MyBarChart data={data} />
          </div>
        </div>
        <AdminDashboardPercent
          percent={allEmployee.length}
          showProgressBar={false}
          description="Total No Of Students"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6  mb-20">
          <AdminDashboardPercent
            percent={((usersWithStatus100 / employeeCount) * 100).toFixed(2)}
            description="completed the course"
          />
          <AdminDashboardPercent
            percent={(
              (usersWithStatusLessThan100 / employeeCount) *
              100
            ).toFixed(2)}
            description="curently doing the course"
          />
          <AdminDashboardPercent
            percent={(
              ((employeeCount -
                usersWithStatus100 -
                usersWithStatusLessThan100) /
                employeeCount) *
              100
            ).toFixed(2)}
            description="not startd the course"
          />
          <AdminDashboardPercent
            percent={(
              (employeesPassedAllQuizzes.length / employeeCount) *
              100
            ).toFixed(2)}
            description="passed all quizes"
          />
          <AdminDashboardPercent
            percent={(
              ((employeeCount - attemptedNotPassed.length) / employeeCount) *
              100
            ).toFixed(2)}
            description="failed a quizes"
          />
          <AdminDashboardPercent
            percent={(
              (uniqueAttemptedByArray.length / employeeCount) *
              100
            ).toFixed(2)}
            description="not started Quiz"
          />
        </div>
      </div>
    </div>
  );
}
