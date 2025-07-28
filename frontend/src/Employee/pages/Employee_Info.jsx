/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import Spinner from "../../Common/Ui/Spinner";
import CourseName from "../Ui/CourseName";
import { ImInfo } from "react-icons/im";
import { FaBook } from "react-icons/fa6";

import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { useCourseByEmpId } from "../../Admin/components/courses/useCourseByEmpId";
import MyPieChart from "../../Admin/components/Chart/PieChart";
import MyBarChart from "../../Admin/components/Chart/BarChart";
import Empty from "../Ui/Empty";
import CardHeading from "../Ui/CardHeading";

export default function EmployeeInfo() {
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading, employe_info } = useEmployeeInfo(token);
  // console.log(employe_info.theme);
  const { courses } = useCourseByEmpId(employe_info?.empId);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const flashUpStyle = {
    opacity: isRendered ? 1 : 0,
    transform: isRendered
      ? "translateY(0) scale(1)"
      : "translateY(-300px) scale(1)",
    transition: " transform .5s ",
  };

  if (isLoading) return <Spinner />;
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  console.log(employe_info);

  const coursesStatus0OrNotFound = [];
  const coursesStatusMoreThan0LessThan100 = [];
  const coursesStatus100 = [];

  courses?.forEach((course) => {
    const userStatus = course?.userStatus.find(
      (user) => user.user === employe_info.empId
    );

    if (userStatus) {
      if (userStatus.status === 0) {
        coursesStatus0OrNotFound.push(course);
      } else if (userStatus.status > 0 && userStatus.status < 100) {
        coursesStatusMoreThan0LessThan100.push(course);
      } else if (userStatus.status === 100) {
        coursesStatus100.push(course);
      }
    } else {
      // If userStatus is not found, push the course to the status 0 array
      coursesStatus0OrNotFound.push(course);
    }
  });

  const data = [
    {
      name: "Total Course",
      percent: courses?.length,
    },
    {
      name: "Not Started",
      percent: coursesStatus0OrNotFound?.length,
    },
    {
      name: "Completed",
      percent: coursesStatus100?.length,
    },
    {
      name: "Ongoing",
      percent: coursesStatusMoreThan0LessThan100?.length,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex w-full h-screen">
        <div className="w-full p-4">
          <div className="w-full">
            <h1 className="text-2xl md:text-4xl text-testColor1 font-bold px-1">
              Student Information
            </h1>
          </div>
          <div className="md:flex w-full pt-4 " style={flashUpStyle}>
            <div
              className={`w-full md:w-1/2  m-1 rounded bg-secondary2 text-testColor1 drop-shadow-xl py-2`}
            >
              <CardHeading title="Basic Information" icon={<ImInfo />} />

              {/* <h3 className="font-semibold p-2 text-lg">Basic Information</h3> */}
              <div className="flex p-2">
                <div className="w-1/2 font-medium">Roll No.</div>
                <div className="w-1/2 flex justify-end">
                  {employe_info.empId}
                </div>
              </div>
              <div className="flex p-2">
                <div className="w-1/2 font-medium">Name:</div>
                <div className="w-1/2 flex justify-end">
                  {employe_info.employeeName}
                </div>
              </div>
              <div className="flex p-2">
                <div className="w-1/2 font-medium">Department:</div>
                <div className="w-1/2 flex justify-end">
                  {employe_info.department}
                </div>
              </div>
              {/* <div className="flex p-2">
                <div className="w-1/2 font-medium">Designation:</div>
                <div className="w-1/2 flex justify-end">
                  {employe_info.designation}
                </div>
              </div> */}
              <div className="flex p-2">
                <div className="w-1/2 font-medium">Joining Date:</div>
                <div className="w-1/2 flex justify-end">
                  {parseDate(employe_info.joiningDate).toLocaleDateString()}
                </div>
              </div>
              {/* <div className="flex p-2">
                <div className="w-1/2 font-medium">Reporting Manager:</div>
                <div className="w-1/2 flex justify-end">
                  {employe_info.reportingManager}
                </div>
              </div> */}
            </div>
            <div
              className="w-full md:w-1/2  m-1 rounded pt-1 text-testColor1 bg-secondary2 drop-shadow-xl"
              style={flashUpStyle}
            >
              <CardHeading title="Assigned Courses" icon={<FaBook />} />
              {employe_info.courses.length === 0 ? (
                <Empty text="No Course Assigned" />
              ) : (
                employe_info.courses.map((course) => (
                  <div
                    key={course}
                    className="flex px-2 font-bold items-center"
                  >
                    <IoChevronForwardCircleOutline />
                    <CourseName course={course} />
                  </div>
                ))
              )}

              {/* {employe_info.courses.map((course) => (
                <div key={course} className="flex px-2 items-center">
                  <IoChevronForwardCircleOutline />
                  <CourseName course={course} />
                </div>
              ))} */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-testColor1 py-4">Track</h1>
          </div>
          <div className="bg-secondary2 h-auto flex py-2 px-2 rounded-lg  w-full">
            <div className="w-1/2 mr-1">
              <MyPieChart data={data} />
            </div>
            <div className="w-1/2 mr-1">
              <MyBarChart data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
