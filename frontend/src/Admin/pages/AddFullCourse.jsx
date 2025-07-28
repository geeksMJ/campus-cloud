/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AddModule from "../ui/AddModule";
import AddCourse from "../ui/AddCourse";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ShowMoreShowLess from "../../Common/Ui/ShowMoreShowLess";
import { useAddCourse } from "../components/courses/useAddCourse";
import { useAddModule } from "../components/courses/useAddModule";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import {
//   IoIosAddCircleOutline,
//   IoIosRemoveCircleOutline,
// } from "react-icons/io";

export default function AddFullCourse() {
  const navigate = useNavigate();
  const [noOfModule, setNoOfModule] = useState(1);
  const [moduleData, setModuleData] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const { addCourse, isLoading: addingCourse, CourseData } = useAddCourse();
  const { addModule, isLoading: addingModule } = useAddModule();

  // function addModule() {
  //   setNoOfModule((prevValue) => prevValue + 1);
  //   setModuleNoList((prevVideoNoList) => [...prevVideoNoList, noOfModule]);
  // }

  // function removeModule() {
  //   if (noOfModule === 1) return null;
  //   setNoOfModule((prevValue) => prevValue - 1);
  //   setModuleNoList((list) => [...list.slice(0, -1)]);
  // }

  console.log("courseData", courseData);

  function handelDone(courseData) {
    if (moduleData.length === 0) {
      toast.error("Upload Atlest One Module");
    } else {
      const formData = new FormData();
      formData.append("courseTitle", courseData.courseTitle);
      formData.append("courseDescription", courseData.courseDescription);
      formData.append("courseDepartment", courseData.courseDepartment);
      formData.append("thumbnail", courseData.thumbnail);
      addCourse(formData, {
        onSuccess: () => {},
      });
    }
  }
  useEffect(() => {
    if (!(CourseData.length === 0) && !(moduleData.length === 0)) {
      moduleData.map((module) => {
        const moduleWithCourse = { ...module, course: CourseData._id };

        return addModule(moduleWithCourse);
      });
      navigate("/admin/courses");
    } else {
      null;
    }
  }, [addModule, moduleData, CourseData, navigate]);

  return (
    <div className="w-full h-full">
      {!courseData ? (
        <AddCourse setCourseData={setCourseData} />
      ) : (
        <div className="w-full h-full p-4">
          <div className=" flex justify-between  pb-2">
            <h1 className="text-2xl font-bold">Your Course</h1>
            <button
              onClick={() => handelDone(courseData)}
              disabled={addingCourse || addingModule}
              className="bg-green-600 text-lg font-semibold text-white py-1 px-2 mx-1 rounded-md cursor-pointer flex justify-center items-center"
            >
              Done
            </button>
          </div>
          <table className="min-w-full leading-normal mb-4">
            <thead>
              <tr>
                <th className="px-2 py-3 w-1/12 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thumbnail
                </th>
                <th className="px-5 py-3 w-3/12 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course Title
                </th>
                <th className="px-5 py-3 w-3/12 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-5 py-3 w-1/12 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-5 py-3 w-4/12 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-1 py-1 w-1/12 border-b border-gray-200 bg-white  text-sm">
                  <img src={courseData.thumbnail} alt="Course Thumbnail" />
                </td>
                <td className="px-5 py-3 w-3/12 border-b border-gray-200 bg-white text-lg font-semibold text-center">
                  {courseData.courseTitle}
                </td>
                <td className="px-5 py-3 w-3/12 border-b border-gray-200 bg-white text-lg font-semibold text-center">
                  {courseData.courseDepartment}
                </td>
                <td className="px-5 py-3 w-1/12 border-b border-gray-200 bg-white text-lg font-semibold text-center">
                  {noOfModule}
                </td>
                <td className="px-5 py-3 w-4/12 border-b border-gray-200 bg-white text-lg font-semibold text-center">
                  <div className="text-gray-900 whitespace-no-wrap">
                    {/* {courseData.courseDescription} */}
                    <ShowMoreShowLess
                      descriptionDetail={courseData.courseDescription}
                      charNo={40}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* <div className="border shadow bg-gray-50 rounded p-2 pt-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-center">Adding Module</h2>
              <div className="flex">
                <button
                  className="bg-red-600 text-md font-semibold text-white py-1 px-2 mx-1 rounded-md cursor-pointer flex justify-center items-center"
                  onClick={removeModule}
                >
                  <IoIosRemoveCircleOutline />
                  Remove Module
                </button>
                <button
                  className="bg-blue-600 text-md font-semibold text-white py-1 px-2 mx-1 rounded-md cursor-pointer flex justify-center items-center"
                  onClick={addModule}
                >
                  <IoIosAddCircleOutline />
                  Add Module
                </button>
              </div>
            </div> */}

          <div className="mt-4">
            <AddModule
              moduleNo={noOfModule}
              setModuleData={setModuleData}
              setNoOfModule={setNoOfModule}
            />
          </div>
        </div>
        // </div>
      )}
    </div>
  );
}