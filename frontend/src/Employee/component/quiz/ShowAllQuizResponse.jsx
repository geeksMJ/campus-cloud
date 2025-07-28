/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useShowAllRespnse } from "../../../Admin/components/quiz/useShowAllRespnse";
import Spinner from "../../../Common/Ui/Spinner";
import EmployeeName from "../../Ui/EmployeeName";
import { FaEye } from "react-icons/fa";

export default function ShowAllQuizResponse({ quizId }) {
  const navigate = useNavigate();
  const { isLoading, allResponse } = useShowAllRespnse(quizId);

  if (isLoading) return <Spinner />;

  // Function to calculate the result based on user answers
  const calculateResult = (response) => {
    if (!response || !response.answers || !response.answers.length) {
      return "Invalid data"; // Handle invalid response
    }

    const totalQuestions = response.answers.length;
    let correctCount = 0;

    response.answers.forEach((answer) => {
      let isCorrect = false;

      // Ensure correctAnswer and userAnswer are defined
      if (
        answer.correctAnswer !== undefined &&
        answer.userAnswer !== undefined
      ) {
        console.log(" ye le Correct Answer:", answer.correctAnswer);
        console.log("ye le User Answer:", answer.userAnswer);

        if (
          Array.isArray(answer.correctAnswer) &&
          Array.isArray(answer.userAnswer)
        ) {
          isCorrect =
            JSON.stringify([...answer.userAnswer].sort()) ===
            JSON.stringify([...answer.correctAnswer].sort());
          console.log(" ye le Inside multiple correct");
        } else if (answer.questionType === "singleCorrect") {
          isCorrect = answer.userAnswer === answer.correctAnswer;
        } else if (
          Array.isArray(answer.userAnswer) &&
          answer.userAnswer.length === 1
        ) {
          isCorrect = answer.correctAnswer === answer.userAnswer[0];
          console.log("ye le Inside multiple correct ");
        }
      }

      if (isCorrect) {
        correctCount += 1;
      }
    });

    // Calculate the percentage of correct answers
    const percentage = (correctCount / totalQuestions) * 100;
    console.log(response.empId, "ye le Result percentage:", percentage);

    // Determine if the user passed or failed
    return percentage;
  };

  return (
    <div>
      <div className="min-h-screen w-full bg-white p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 w-2/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-5 py-3 w-2/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Employee Id
                </th>
                <th className="px-5 py-3 w-1/6 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-5 py-3 w-2/6 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allResponse.map((response) => (
                <tr key={response._id}>
                  {console.log("ye le ", response)}
                  <td className="px-5 py-3 w-2/6 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <EmployeeName empId={response.empId} />
                    </p>
                  </td>
                  <td className="px-5 py-3 w-1/6 border-b border-gray-200 bg-white text-sm text-left">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {response.empId}
                    </p>
                  </td>
                  <td className="px-5 py-3 w-1/6 border-b border-gray-200 bg-white text-sm text-left">
                    <div
                      className={`px-4 py-2 rounded-full ${
                        calculateResult(response) > 70
                          ? "bg-green-600"
                          : "bg-red-600"
                      } text-white`}
                    >
                      <p className="font-semibold text-md text-center">
                        {`${Math.round(calculateResult(response))}% ${
                          calculateResult(response) > 70 ? "Pass" : "Fail"
                        }`}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3 w-2/6 border-b border-gray-200 bg-white text-sm text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/quizzes/ShowAnswers/${response._id}`)
                        }
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full"
                      >
                        <span className="text-xl">
                          <FaEye />
                        </span>
                        <span className="font-semibold text-md">
                          See Answer
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
