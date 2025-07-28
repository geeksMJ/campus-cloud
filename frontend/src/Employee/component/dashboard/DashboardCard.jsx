/* eslint-disable react/prop-types */
// src/Employee/component/dashboard/DashboardCard.jsx

import { useNavigate } from "react-router-dom";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useEmployeeInfo } from "../employee_info/useEmployeeInfo";
import CardHeading from "../../Ui/CardHeading";

export default function DashboardCard({
  title,
  icon,
  courses,
  Certificate = false,
  delay = 0, // Accept a delay prop with a default value of 0
}) {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployeeInfo, employe_info } =
    useEmployeeInfo(token);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (loadingEmployeeInfo) return null;

  // Apply delay to the transition style
  const flashUpStyle = {
    opacity: isRendered ? 1 : 0.9,
    transform: isRendered
      ? "translateY(0) scale(1)"
      : "translateY(-500px) scale(1)",
    transition: `transform .5s ${delay}s`, // Apply the delay here
  };

  return (
    <div className="py-2 bg-secondary2 rounded shadow" style={flashUpStyle}>
      <CardHeading title={title} icon={icon} />

      <ul className="max-h-[16vh] mx-4 mb-2 overflow-y-auto">
        {courses?.length === 0 ? (
          <div className="w-full flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <img src="/empty2.gif" className="w-1/6" />
              </div>
              <p className="text-xl px-4 font-medium text-testColor1">
                No {title}
              </p>
            </div>
          </div>
        ) : (
          courses?.map((course, index) => (
            <li
              key={index}
              onClick={() => {
                navigate(
                  `${
                    Certificate
                      ? `/certificate/${employe_info.employeeName}/${course.courseTitle}/${employe_info.department}`
                      : `/employee/course/${course?._id}`
                  }`
                );
              }}
              className="p-1 flex items-center hover:underline text-testColor1 text-lg cursor-pointer font-bold"
            >
              <span className="pr-2 ">
                <IoChevronForwardCircleOutline />
              </span>

              {course?.courseTitle}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
