/* eslint-disable no-unused-vars */
import { useState } from "react";
import EmployeeDropdown from "../../ui/EmployeeDropDown";
import { useCourseByEmpId } from "../courses/useCourseByEmpId";
import MyPieChart from "../Chart/PieChart";
import MyBarChart from "../Chart/BarChart";

export default function TrackByEmployee() {
  const [selectedOption, setSelectedOption] = useState();
  const { isLoading, courses } = useCourseByEmpId(selectedOption);

  const coursesStatus0OrNotFound = [];
  const coursesStatusMoreThan0LessThan100 = [];
  const coursesStatus100 = [];

  courses?.forEach((course) => {
    const userStatus = course?.userStatus.find(
      (user) => user.user === selectedOption
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
      name: "completed",
      percent: coursesStatus100?.length,
    },
    {
      name: "ongoing",
      percent: coursesStatusMoreThan0LessThan100?.length,
    },
  ];

  return (
    <div className="bg-gray-50 h-auto shadow-md rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-6">Track by username</h1>
      </div>
      <div className="pb-3">
        <EmployeeDropdown
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
    </div>
  );
}
