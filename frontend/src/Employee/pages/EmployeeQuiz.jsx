import { useNavigate } from "react-router-dom";
import ShowQuizCard from "../../Admin/components/quiz/ShowQuizCard";
import { useAllQuizs } from "../../Admin/components/quiz/useAllQuiz";
import Spinner from "../../Common/Ui/Spinner";
import { useState } from "react";
import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import QuizCard from "../component/quiz/QuizCard";

export default function EmployeeQuiz() {
  const navigate = useNavigate();
  const { isLoading, allQuizs } = useAllQuizs();

  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployee, employe_info } = useEmployeeInfo(token);

  if (isLoading || loadingEmployee) return <Spinner />;

  const withDepartment = allQuizs.filter(
    (quiz) =>
      quiz.department &&
      quiz.department.length > 0 &&
      quiz.department.includes(employe_info.department)
  );

  console.log("ye le", withDepartment);
  console.log("ye le", allQuizs);

  return (
    <div className="min-h-screen w-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-testColor1">Quizzes</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 my-6">
        {withDepartment.length > 0 &&
          withDepartment?.map((quiz) => {
            // console.log(quiz.attemptedBy);
            // console.log(quiz.passedBy);
            return (
              <QuizCard
                key={quiz._id}
                id={quiz._id}
                quiz={quiz}
                title={quiz.title}
                attempted={quiz.attemptedBy}
                passed={quiz.passedBy}
              />
            );
          })}
      </div>
    </div>
  );
}
