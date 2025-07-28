import { useState } from "react";
import ShowQuizCard from "../components/quiz/ShowQuizCard";
import { useNavigate } from "react-router-dom";
import { useAllQuizs } from "../components/quiz/useAllQuiz";
import Spinner from "../../Common/Ui/Spinner";
import AddButton from "../ui/AddButton";
import { useQuizByCourseId } from "../components/quiz/useQuizByCourseId";
import CourseDropdown from "../ui/CourseDropDown";
import Empty from "../../Employee/Ui/Empty";

export default function Quizzes() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(""); // Course dropdown selected value
  const { isLoading, allQuizs } = useAllQuizs();
  const [quizType, setQuizType] = useState("all"); // Default to showing all quizzes
  const { quizs: quizzesByCourse, isLoading: isCourseLoading } =
    useQuizByCourseId(selectedOption); // Fetch quizzes by course

  // State to store search query
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <Spinner />;

  const withDepartment = allQuizs.filter(
    (quiz) => quiz.department && quiz.department.length > 0
  );
  const withModule = allQuizs.filter(
    (quiz) =>
      quiz.module &&
      quiz.module.length > 0 &&
      (!quiz.department || quiz.department.length === 0)
  );
  const withoutDepartmentOrModule = allQuizs.filter(
    (quiz) =>
      (!quiz.department || quiz.department.length === 0) &&
      (!quiz.module || quiz.module.length === 0)
  );

  // Filter quizzes based on quizType and search query
  let displayedQuizzes = allQuizs;

  if (quizType === "for_department") {
    displayedQuizzes = withDepartment;
  } else if (quizType === "for_module") {
    displayedQuizzes = withModule;
  } else if (quizType === "not_used") {
    displayedQuizzes = withoutDepartmentOrModule;
  }

  // Filter by search query
  displayedQuizzes = displayedQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If selectedOption is not empty, show quizzes by the selected course
  if (selectedOption) {
    displayedQuizzes = quizzesByCourse;
  }

  return (
    <div className="min-h-screen w-full bg-white p-4 mb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Quizzes</h1>
        <AddButton
          title="Quiz"
          onClick={() => {
            navigate("/admin/quizzes/createQuiz");
          }}
        />
      </div>

      <div className="flex pb-2">
        <button
          className=" mt-4 py-2 w-full bg-purple-600 text-white rounded font-bold"
          onClick={() => {
            setQuizType("all");
            setSelectedOption(""); // Reset the course selection when showing all quizzes
          }}
        >
          <div className="flex items-center justify-center">
            <span className="px-2">All Quizzes</span>
          </div>
        </button>
        <button
          className="ml-2 mt-4 py-2 w-full bg-green-600 text-white rounded font-bold"
          onClick={() => {
            setQuizType("not_used");
            setSelectedOption(""); // Reset the course selection when showing not used quizzes
          }}
        >
          <div className="flex items-center justify-center">
            <span className="px-2">Not Used Quizzes</span>
          </div>
        </button>
        <button
          className="ml-2 mt-4 py-2 w-full bg-blue-500 text-white rounded font-bold"
          onClick={() => {
            setQuizType("for_module");
            setSelectedOption(""); // Reset the course selection when showing module quizzes
          }}
        >
          <div className="flex items-center justify-center">
            <span className="px-2">Module Quizzes</span>
          </div>
        </button>
        <button
          className="ml-2 mt-4 py-2 w-full bg-yellow-500 text-white rounded font-bold"
          onClick={() => {
            setQuizType("for_department");
            setSelectedOption(""); // Reset the course selection when showing department quizzes
          }}
        >
          <div className="flex items-center justify-center">
            <span className="px-2">Department Quizzes</span>
          </div>
        </button>
      </div>

      <div className="flex m-2 rounded-lg mr-2">
        <input
          type="search"
          placeholder="Search Quiz"
          className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="w-1/3 ml-2">
          <CourseDropdown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </div>

      {isCourseLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {displayedQuizzes.length > 0 &&
              displayedQuizzes.map((quiz) => (
                <ShowQuizCard
                  key={quiz._id}
                  id={quiz._id}
                  title={quiz.title}
                  moduleId={quiz.module}
                  department={quiz.department}
                  viewQuizHandler={() => {
                    navigate(`/admin/quizzes/viewQuiz/${quiz._id}`);
                  }}
                />
              ))}
          </div>
          {!(displayedQuizzes.length > 0) && (
            <div className="w-full">
              <Empty text="No Quiz Found" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
