/* eslint-disable no-unused-vars */

import ShowMoreShowLess from "../../Common/Ui/ShowMoreShowLess";
import Spinner from "../../Common/Ui/Spinner";
import CourseThumbnail from "../component/courses/CourseThumbnail";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import { useCourseByEmpId } from "../../Admin/components/courses/useCourseByEmpId";
import { PiEmptyBold } from "react-icons/pi";
import { useCourseNotByEmpId } from "../../Admin/components/courses/useCourseNotDepartmentName";
import Heading from "../Ui/Heading";
import Empty from "../Ui/Empty";
import { motion } from "framer-motion";
import CardHeading from "../Ui/CardHeading";
import { MdOutlineOndemandVideo } from "react-icons/md";

export default function EmployeeCourses() {
  const navigate = useNavigate();
  // const { isLoading, allCourse } = useAllCourse();

  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployee, employe_info } = useEmployeeInfo(token);
  const { isLoading, courses } = useCourseByEmpId(employe_info?.empId);
  const { isLoading: loadingMoreCourse, courses: moreCourse } =
    useCourseNotByEmpId(employe_info?.empId);
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
  }, []);

  const getItemStyle = (index) => ({
    opacity: isRendered ? 1 : 0,
    transform: isRendered
      ? "translateY(0) scale(1)"
      : "translateY(-500px) scale(1)",
    transition: "transform .5s",
    transitionDelay: isRendered ? `${index}s` : "0s", // Different delay for each item
  });

  if (isLoading || loadingEmployee || loadingMoreCourse) return <Spinner />;

  console.log(moreCourse);

  // Separate courses into different categories based on status
  const coursesStatus0OrNotFound = [];
  const coursesStatusMoreThan0LessThan100 = [];
  const coursesStatus100 = [];

  courses.forEach((course) => {
    const userStatus = course.userStatus.find(
      (user) => user.user === employe_info.empId
    );

    if (userStatus) {
      if (userStatus.status === 0) {
        coursesStatus0OrNotFound.push(course);
      } else if (userStatus.status >= 0 && userStatus.status < 100) {
        coursesStatusMoreThan0LessThan100.push(course);
      } else if (userStatus.status === 100) {
        coursesStatus100.push(course);
      }
    } else {
      // If userStatus is not found, push the course to the status 0 array
      coursesStatus0OrNotFound.push(course);
    }
  });

  const getMostRecentCourseForUser = (courses, currentCourse) => {
    return courses.find((course) => course._id === currentCourse);
  };

  const mostRecentCourse = getMostRecentCourseForUser(
    courses,
    employe_info.currentCourse
  );

  return (
    <div className="w-full p-4 pt-0 h-full ">
      {!mostRecentCourse ? null : (
        <div style={getItemStyle(0)}>
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="w-full md:flex py-2 pt-2 mt-4 bg-secondary2 rounded shadow-xl"
          >
            <div className="w-full">
              <div>
                <CardHeading title="Current Courses" />
              </div>
              <div className="flex w-full">
                <div className="md:w-1/2 px-2 ">
                  <img
                    className="w-full"
                    src={mostRecentCourse?.thumbnail}
                    alt="thumbnail"
                    style={getItemStyle(0.1)}
                  />
                </div>
                <div className="md:w-1/2 p-4 flex flex-col">
                  <p className="text-2xl font-bold pb-2 text-testColor1">
                    {mostRecentCourse?.courseTitle}
                  </p>
                  <div className="text-lg font-medium">
                    <ShowMoreShowLess
                      descriptionDetail={mostRecentCourse?.courseDescription}
                      charNo={200}
                    />
                  </div>
                  <button
                    className="w-full bg-primary text-slate-50 rounded-md font-bold text-sm p-1 mt-auto"
                    onClick={() => {
                      navigate(`/employee/course/${mostRecentCourse?._id}`);
                    }}
                  >
                    Continue Course
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="w-full my-4 rounded bg-secondary2 drop-shadow-xl md:pt-2">
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

      <div className="w-full  my-4  rounded bg-secondary2 drop-shadow-xl md:pt-2">
        <CardHeading
          title="Courses Not Started"
          icon={<MdOutlineOndemandVideo />}
        />
        <div className="flex flex-wrap">
          {coursesStatus0OrNotFound.length > 0 ? (
            <div className="flex flex-wrap w-full">
              {coursesStatus0OrNotFound.map((course) => (
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

      <div className="w-full  my-4  rounded bg-secondary2 drop-shadow-xl md:pt-2">
        <CardHeading
          title="Courses Completed"
          icon={<MdOutlineOndemandVideo />}
        />
        <div className="flex flex-wrap">
          {coursesStatus100.length > 0 ? (
            <div className="flex flex-wrap w-full">
              {coursesStatus100.map((course) => (
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

      <div className="w-full  my-4 rounded bg-secondary2 drop-shadow-xl md:pt-2">
        <CardHeading title="More Courses" icon={<MdOutlineOndemandVideo />} />
        <div className="flex flex-wrap">
          {moreCourse.length > 0 ? (
            <div className="flex flex-wrap w-full">
              {moreCourse.map((course) => (
                <CourseThumbnail
                  key={course._id}
                  course={course}
                  notEnorll={true}
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
    </div>
  );
}
