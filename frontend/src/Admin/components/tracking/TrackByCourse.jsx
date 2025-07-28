/* eslint-disable no-unused-vars */
import { useState } from "react";
import CourseDropdown from "../../ui/CourseDropDown";
import AdminDashboardPercent from "../dashboard/AdminDashboardPercent";
import { useAllEmployee } from "../settings/useAllEmployee";
import { useAllCourse } from "../courses/useAllCourse";
import { useQuizByCourseId } from "../quiz/useQuizByCourseId";
import MyPieChart from "../Chart/PieChart";
import MyBarChart from "../Chart/BarChart";

export default function TrackByCourse() {
  const [selectedOption, setSelectedOption] = useState();
  const { isLoading: loadingAllEmployee, allEmployee } = useAllEmployee();
  const { isLoading: loadindCourses, allCourse } = useAllCourse();
  const { isLoading: loadingQuizs, quizs } = useQuizByCourseId(
    selectedOption || null
  );

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
      name: "Completed",
      percent: Math.round((usersWithStatus100 / employeeCount) * 100),
    },
    {
      name: "Currently Doing",
      percent: Math.round((usersWithStatusLessThan100 / employeeCount) * 100),
    },
    {
      name: "Not Started",
      percent: Math.round(
        ((employeeCount - usersWithStatus100 - usersWithStatusLessThan100) /
          employeeCount) *
          100
      ),
    },
    {
      name: "Passed All Quizzes",
      percent: Math.round(
        (employeesPassedAllQuizzes.length / employeeCount) * 100
      ),
    },
    {
      name: "Failed a Quiz",
      percent: Math.round(
        ((employeeCount - attemptedNotPassed.length) / employeeCount) * 100
      ),
    },
    {
      name: "Not Started Quiz",
      percent: Math.round(
        (uniqueAttemptedByArray.length / employeeCount) * 100
      ),
    },
  ];
  return (
    <div className="bg-gray-50 h-auto shadow-md rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">

        <h1 className="text-xl font-semibold mb-6">Track By Course</h1>

      </div>
      <div className="pb-3">
        <CourseDropdown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      <div className="bg-gray-100 h-auto mb-4 flex py-2 px-2 rounded-lg  w-full">
        <div className="w-1/2 mr-1">
          <MyPieChart data={data} />
        </div>
        <div className="w-1/2 mr-1">
          <MyBarChart data={data} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
        <AdminDashboardPercent
          percent={((usersWithStatus100 / employeeCount) * 100).toFixed(2)}
          description="completed the course"
        />
        <AdminDashboardPercent
          percent={((usersWithStatusLessThan100 / employeeCount) * 100).toFixed(
            2
          )}
          description="of employee curently doing the course"
        />
        <AdminDashboardPercent
          percent={(
            ((employeeCount - usersWithStatus100 - usersWithStatusLessThan100) /
              employeeCount) *
            100
          ).toFixed(2)}
          description="of employee not startd the course"
        />
        <AdminDashboardPercent
          percent={(
            (employeesPassedAllQuizzes.length / employeeCount) *
            100
          ).toFixed(2)}
          description="of employee passed all quizes"
        />
        <AdminDashboardPercent
          percent={(
            ((employeeCount - attemptedNotPassed.length) / employeeCount) *
            100
          ).toFixed(2)}
          description="of employee failed a quizes"
        />
        <AdminDashboardPercent
          percent={(
            (uniqueAttemptedByArray.length / employeeCount) *
            100
          ).toFixed(2)}
          description="of employee not started Quiz"
        />
      </div>
    </div>
  );
}
