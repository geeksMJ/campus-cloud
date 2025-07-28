/* eslint-disable no-unused-vars */
// src/pages/Dashboard.jsx

import CourseThumbnail from "../component/courses/CourseThumbnail";
import DashboardCard from "../component/dashboard/DashboardCard";
import Spinner from "../../Common/Ui/Spinner";
import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import { useState } from "react";
import { GrCertificate } from "react-icons/gr";
import { PiEmptyBold } from "react-icons/pi";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import { useCourseByEmpId } from "../../Admin/components/courses/useCourseByEmpId";
import { useNavigate } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import Empty from "../Ui/Empty";
import CardHeading from "../Ui/CardHeading";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployeeInfo, employe_info } =
    useEmployeeInfo(token);
  const { isLoading: loadingCourseByEmpId, courses: courseByEmpId } =
    useCourseByEmpId(employe_info?.empId);

  if (loadingCourseByEmpId || loadingEmployeeInfo) return <Spinner />;

  const coursesStatus0OrNotFound = [];
  const coursesStatusMoreThan0LessThan100 = [];
  const coursesStatus100 = [];

  courseByEmpId?.forEach((course) => {
    const userStatus = course?.userStatus.find(
      (user) => user.user === employe_info?.empId
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

  return (
    <div className="p-4 w-full  min-h-screen">
      {/* <NetworkStatus /> */}
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl md:text-4xl w-1/2 text-testColor1 font-bold mb-4">
          Dashboard
        </h1>
        <p className="text-sm md:text-xl text-testColor1 mb-4 pt-2 font-medium">
          {" "}
          {`Employee ID : ${employe_info.empId}`}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        <DashboardCard
          title="Courses Completed"
          icon={<MdOutlineBookmarkAdded />}
          courses={coursesStatus100}
          delay={0.3}
        />
        <DashboardCard
          title="Courses Enrolled"
          icon={<MdOutlineBookmarkBorder />}
          courses={courseByEmpId}
          delay={0.2}
        />
        <DashboardCard
          title="Courses Not Started"
          icon={<MdOutlineBookmarkAdd />}
          courses={coursesStatus0OrNotFound}
          delay={0.1}
        />
        <DashboardCard
          title="Certificates Earned"
          icon={<GrCertificate />}
          courses={coursesStatus100}
          Certificate={true}
          delay={0}
        />
      </div>

      <div className="w-full rounded bg-secondary2 drop-shadow-xl md:pt-2">
        <CardHeading
          title="Ongoing Courses"
          icon={<MdOutlineOndemandVideo />}
        />
        <div className="flex flex-wrap">
          {coursesStatusMoreThan0LessThan100.length > 0 ? (
            <div className="flex flex-wrap w-full">
              {coursesStatusMoreThan0LessThan100.map((course) => (
                <CourseThumbnail
                  key={course._id}
                  course={course}
                  progress={
                    course.userStatus.find(
                      (user) => user.user === employe_info.empId
                    )?.status || 0
                  }
                />
              ))}
            </div>
          ) : (
            <Empty text="No ongoing courses at the moment." />
          )}
        </div>
      </div>

      <div className="w-full  rounded bg-secondary2 drop-shadow-xl mt-6 md:py-4 md:pt-2">
        <CardHeading title="Certificates" icon={<PiCertificateBold />} />
        <div className="flex p-2 flex-wrap">
          {coursesStatus100.length === 0 ? (
            <Empty text="No Certificates Earned." />
          ) : (
            coursesStatus100.map((course) => (
              <div
                key={course._id}
                className="border rounded shadow p-2 w-3/12"
              >
                <div className="flex w-full justify-center">
                  <div className="w-full">
                    <div className="flex justify-center  items-center text-xl font-bold pb-2 text-center hover:underline">
                      {course.courseTitle}
                      <span className="px-2">
                        <PiCertificateBold />
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        navigate(
                          `/certificate/${employe_info.employeeName}/${course.courseTitle}/${employe_info.department}`
                        );
                      }}
                      className="bg-blue-600 w-full rounded px-3 py-1 text-white"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
