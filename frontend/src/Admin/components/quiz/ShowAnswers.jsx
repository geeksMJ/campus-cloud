import { useParams } from "react-router-dom";
import { useRespnseById } from "./useResponceById";
import Spinner from "../../../Common/Ui/Spinner";
import EmployeeName from "../../../Employee/Ui/EmployeeName";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";

export default function ShowAnswers() {
  const { responseId } = useParams();
  const { isLoading, response } = useRespnseById(responseId);

  if (isLoading) return <Spinner />;
  console.log(response);

  const getBackgroundColor = (correct, user) => {
    if (Array.isArray(user) && !Array.isArray(correct)) {
      if (user.length > 1) {
        return "bg-red-200";
      } else if (user[0] !== correct) {
        return "bg-red-200";
      } else {
        return "bg-green-200";
      }
    }

    if (Array.isArray(correct) && Array.isArray(user)) {
      if (JSON.stringify(correct.sort()) === JSON.stringify(user.sort())) {
        return "bg-green-200";
      } else {
        return "bg-red-200";
      }
    }

    return correct === user ? "bg-green-200" : "bg-red-200";
  };

  return (
    <div className="p-8 w-full bg-gray-100 h-fit">
      <div className="flex items-center w-full justify-between text-2xl font-bold mb-6 pr-20">
        <span className="flex">
          Response From
          <span className="px-1">
            <EmployeeName empId={response.empId} />
          </span>
        </span>
        <div className="flex">
          <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full">
            <FaRegCheckCircle className="text-lg" />
            <span className="font-semibold text-sm px-1">Pass</span>
          </button>
          <button className="flex items-center mx-2 bg-red-600 text-white px-4 py-2 rounded-full">
            <FaRegTimesCircle className="text-lg" />
            <span className="font-semibold text-sm px-1">Fail</span>
          </button>
        </div>
      </div>

      {response?.answers.map((question, index) => {
        // console.log("ye le ", question);
        const getOptionText = (optionKey) => {
          return question[optionKey];
        };

        const backgroundColor = getBackgroundColor(
          question.correctAnswer,
          question.userAnswer
        );

        return (
          <div
            key={index}
            className={`w-full m-2 p-2 ${backgroundColor} border rounded-md`}
          >
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`question-${index}`}
            >
              Question {index + 1}: {question.question}
            </label>
            <div className="">
              {["option1", "option2", "option3", "option4"].map(
                (optionKey, idx) => (
                  <div className="flex" key={idx}>
                    <p className="font-bold">{idx + 1}.</p>
                    <p className="px-2">{getOptionText(optionKey)}</p>
                  </div>
                )
              )}
            </div>
            <div className="flex py-1">
              <p>Correct Answer(s):</p>
              <p className="px-2">
                {Array.isArray(question.correctAnswer)
                  ? question.correctAnswer
                      .map((ans) => getOptionText(ans))
                      .join(", ")
                  : question.correctAnswer}
              </p>
            </div>
            <div className="flex py-1">
              <p>User Answer(s):</p>
              <p className="px-2">
                {Array.isArray(question.userAnswer)
                  ? question.userAnswer
                      .map((ans) => getOptionText(ans))
                      .join(", ")
                  : question.userAnswer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
