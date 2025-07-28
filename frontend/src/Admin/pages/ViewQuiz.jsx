/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useNavigate, useParams } from "react-router-dom";
import { useQuizId } from "../../Admin/components/quiz/useQuizById";
import { FaEye } from "react-icons/fa";
import TextQuestion from "../../Employee/component/quiz/TextQuestion";
import SingleCorrectQuestion from "../../Employee/component/quiz/SingleCorrectQuestion";
import MultipeCorrectQuestion from "../../Employee/component/quiz/MultipeCorrectQuestion";
import Spinner from "../../Common/Ui/Spinner";
import BackButton from "../../Common/Ui/BackButton";
import { useState } from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { TiPencil } from "react-icons/ti";
import ShowAllQuizResponse from "../../Employee/component/quiz/ShowAllQuizResponse";
import { FaEyeSlash } from "react-icons/fa";
import { useAllCourse } from "../components/courses/useAllCourse";
import SelectModule from "../components/quiz/SelectModule";
import ShowTextAnswer from "../components/quiz/ShowTextAnswer";
import ShowSingleCorrectOption from "../components/quiz/ShowSingleCorrectOption";
import ShowMultipleCorrectOption from "../components/quiz/ShowMultipleCorrectOption";
import FloatContainer from "../../Common/Ui/FloatContainer";
import Dropdown from "../ui/DropDown";
import { IoIosArrowDropright } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { useAddModuleInQuiz } from "../components/quiz/useAddModuleInQuiz";

export default function ViewQuiz() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [answers, setAnswers] = useState([]);
  const { isloading, quiz } = useQuizId(quizId);
  const { isLoading: loadindCourses, allCourse } = useAllCourse();
  const [selectModule, setSelectModule] = useState(null);
  const [viewResponse, setViewResponse] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const { addModuleInQuiz, isLoading } = useAddModuleInQuiz();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSelectDepartment = (option) => {
    setSelectedOption(option);

    // Add selected option to the array only if it doesn't exist
    if (!selectedDepartments.includes(option)) {
      setSelectedDepartments((prevDepartments) => [...prevDepartments, option]);
    }
  };

  // Function to handle when the "Done" button is clicked
  const handleDone = () => {
    if (selectedDepartments.length === 0) return null;
    setSelectModule("");
    addModuleInQuiz({ quizId: quizId, department: selectedDepartments });
    setSelectedDepartments([]);
  };

  const removeDepartment = (indexToRemove) => {
    setSelectedDepartments((prevDepartments) =>
      prevDepartments.filter((_, index) => index !== indexToRemove)
    );
  };

  if (isloading || loadindCourses) return <Spinner />;

  const filteredEmployees = allCourse?.filter((course) =>
    course.courseTitle.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <>
      <BackButton />
      <div className="flex w-full">
        <div className={`p-8  w-full bg-gray-100  h-fit`}>
          <h1 className="text-4xl font-bold mb-4">{quiz?.title}</h1>

          <div className="flex pb-2">
            <button
              className="ml-2  mt-4 py-2 w-full bg-yellow-500 text-white rounded font-bold"
              onClick={() => setSelectModule((value) => "module")}
            >
              <div className="flex items-center justify-center">
                <AiOutlineSelect />
                <span className="px-2">Select Module</span>
              </div>
            </button>
            <button
              className="ml-2  mt-4 py-2 w-full bg-red-500 text-white rounded font-bold"
              onClick={() => setSelectModule((value) => "department")}
            >
              <div className="flex items-center justify-center">
                <AiOutlineSelect />
                <span className="px-2">Select Department</span>
              </div>
            </button>
            <button
              className="ml-2  mt-4 py-2 w-full bg-green-600 text-white rounded font-bold"
              onClick={() => setViewResponse((valve) => !valve)}
            >
              <div className="flex items-center justify-center">
                {viewResponse ? <FaEye /> : <FaEyeSlash />}
                <span className="px-2">
                  {viewResponse ? "Hide Response" : "View Response"}
                </span>
              </div>
            </button>
            <button
              className="ml-2  mt-4 py-2 w-full bg-blue-500 text-white rounded font-bold"
              onClick={() => {
                navigate(`/admin/quizzes/editQuiz/${quiz._id}`);
              }}
            >
              <div className="flex items-center justify-center">
                <TiPencil />
                <span className="px-2">Edit Quiz</span>
              </div>
            </button>
          </div>

          {viewResponse ? (
            <ShowAllQuizResponse quizId={quizId} />
          ) : (
            quiz?.questions.map((question, index) => {
              if (question.questionType === "text") {
                return (
                  <ShowTextAnswer
                    key={index}
                    index={index}
                    question={question}
                    setAnswers={setAnswers}
                  />
                );
              } else if (question.questionType === "singleCorrect") {
                return (
                  <ShowSingleCorrectOption
                    key={index}
                    index={index}
                    question={question}
                    setAnswers={setAnswers}
                  />
                );
              } else {
                return (
                  <ShowMultipleCorrectOption
                    key={index}
                    index={index}
                    question={question}
                    setAnswers={setAnswers}
                  />
                );
              }
            })
          )}
        </div>
        {selectModule && (
          // <div className="w-3/12 p-2 pl-0 bg-gray-100 pt-20">
          <FloatContainer
            onClose={() => {
              setSelectModule(null);
            }}
          >
            {selectModule === "module" ? (
              <div className="bg-slate-300 rounded p-4 w-1/3 shadow-xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Enter Course Name"
                      value={name}
                      onChange={handleChange}
                      className="shadow-md my-1 appearance-none border rounded w-full py-2 px-3 bg-gray-200
                               text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                               border-slate-500"
                    />
                  </div>
                </div>

                {filteredEmployees?.map((course) => (
                  <div
                    key={course._id}
                    className="border border-slate-500 bg-gray-200 rounded mb-3 shadow-lg"
                  >
                    <div className="p-4">
                      <div className="text-lg font-bold text-center text-gray-800">
                        {course.courseTitle}
                      </div>
                      <div className="mt-2">
                        <SelectModule
                          courseId={course._id}
                          quizId={quizId}
                          setSelectModule={setSelectModule}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-100 p-4 rounded">
                <div className="pb-4 font-bold text-2xl text-center">
                  Select Department
                </div>
                <Dropdown
                  selectedOption={selectedOption}
                  setSelectedOption={handleSelectDepartment} // use the handler function
                />
                {selectedOption && (
                  <>
                    <div className="py-4 font-semibold text-xl text-center">
                      Selected Departments
                    </div>
                    <div className="">
                      {selectedDepartments.map((department, index) => (
                        <div
                          key={index}
                          className="py-1 flex font-medium text-lg items-center"
                        >
                          <span className="pr-2 font-bold">
                            <IoIosArrowDropright />
                          </span>

                          {department}
                          <button
                            className="ml-auto text-red-500"
                            onClick={() => removeDepartment(index)} // Remove department on click
                          >
                            <RxCrossCircled size={24} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleDone} // trigger the done action
                    className="font-semibold text-white py-1 px-3 bg-green-600 rounded mx-2"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setSelectModule("");
                      setSelectedOption("");
                      setSelectedDepartments([]);
                    }} // Reset selection
                    className="font-semibold text-white py-1 px-3 bg-gray-600 rounded mx-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </FloatContainer>
          // </div>
        )}
        <div className="mb-10 h-10"></div>
      </div>
    </>
  );
}
