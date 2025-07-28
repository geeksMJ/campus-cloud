import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizId } from "../../Admin/components/quiz/useQuizById";
import Spinner from "../../Common/Ui/Spinner";
import TextQuestion from "../component/quiz/TextQuestion";
import SingleCorrectQuestion from "../component/quiz/SingleCorrectQuestion";
import MultipeCorrectQuestion from "../component/quiz/MultipeCorrectQuestion";
import { useUploadQuizResponse } from "../../Admin/components/quiz/useuploadQuizResponse";
import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuizAttempt } from "../../Admin/components/quiz/useQuizAttempt";
import BackButton from "../../Common/Ui/BackButton";

export default function Quiz() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [quizSubmited, setQuizSubmited] = useState(false);
  const { isloading, quiz } = useQuizId(quizId);
  const [answers, setAnswers] = useState([]);
  const { uploadQuizResponse, isLoading } = useUploadQuizResponse();
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployeeInfo, employe_info } =
    useEmployeeInfo(token);
  const { quizAttempt, isLoading: loadingQuizAttempt } = useQuizAttempt();

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const cleanedAnswers = answers.filter((answer) => answer !== undefined);
    uploadQuizResponse(
      {
        empId: employe_info.empId,
        quizId: quizId,
        answers: cleanedAnswers,
      },
      {
        onSuccess: () => {
          setQuizSubmited(true);
          setAnswers(cleanedAnswers);
        },
      }
    );
  };

  useEffect(() => {
    if (quizSubmited) {
      const correctCount = answers.reduce((count, answer) => {
        const { correctAnswer, userAnswer } = answer;
        if (Array.isArray(correctAnswer)) {
          // For multiple correct answers
          return (
            count +
            (userAnswer.length === correctAnswer.length &&
            userAnswer.every((ans) => correctAnswer.includes(ans))
              ? 1
              : 0)
          );
        } else {
          // For single correct answers
          return count + (userAnswer === correctAnswer ? 1 : 0);
        }
      }, 0);

      const totalQuestions = answers.length;
      const percentage = (correctCount / totalQuestions) * 100;
      const status = percentage > 70 ? "pass" : "Fail";

      quizAttempt({
        empId: employe_info.empId,
        quizId: quizId,
        status: status,
      });
    }
  }, [employe_info?.empId, quizAttempt, quizId, quizSubmited, answers]);

  if (isloading || loadingEmployeeInfo) return <Spinner />;

  let correctCount = 0;
  let wrongCount = 0;
  let percentage = 0;
  let totalQuestions = 0;
  let isPass = 0;

  if (quizSubmited) {
    answers.forEach((answer) => {
      const { correctAnswer, userAnswer } = answer;

      if (Array.isArray(correctAnswer)) {
        const isCorrect =
          userAnswer.length === correctAnswer.length &&
          userAnswer.every((ans) => correctAnswer.includes(ans));
        if (isCorrect) correctCount++;
        else wrongCount++;
      } else {
        if (userAnswer === correctAnswer) correctCount++;
        else wrongCount++;
      }
    });

    totalQuestions = answers.length;
    percentage = (correctCount / totalQuestions) * 100;
    isPass = percentage > 70;
  }

  return (
    <div className="md:p-8 p-4 w-full bg-secondary h-fit">
      <BackButton />
      <h1 className="md:text-4xl text-2xl font-bold text-testColor1 mb-4">
        {quiz?.title}
      </h1>
      {quizSubmited ? (
        <div
          className={`flex justify-center w-full p-8 ${
            isPass ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <div
            className={`rounded-lg w-full shadow-xl p-8 text-center border border-slate-600 ${
              isPass ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <h2 className="text-3xl font-bold text-slate-600 mb-4">
              Quiz Results
            </h2>
            <div
              className="my-6"
              style={{ width: 200, height: 200, margin: "0 auto" }}
            >
              <CircularProgressbar
                value={percentage}
                text={`${percentage.toFixed(2)}%`}
                styles={buildStyles({
                  textColor: isPass ? "#2f4138" : "#342929",
                  pathColor: isPass ? "#0da975" : "#e41010",
                  trailColor: isPass ? "#d1fae5" : "#fee2e2",
                  textSize: "20px",
                  strokeLinecap: "round",
                })}
              />
            </div>
            <div className="text-4xl flex justify-center font-bold text-slate-600 mt-4">
              <p className="border w-auto px-6 rounded">
                {isPass ? "Pass" : "Fail"}
              </p>
            </div>
            <div className="flex justify-between text-xl font-semibold text-slate-600 mt-8">
              <span>Questions: {totalQuestions}</span>
              <span>Correct: {correctCount}</span>
              <span>Wrong: {wrongCount}</span>
            </div>
          </div>
        </div>
      ) : (
        quiz?.questions.map((question, index) => {
          console.log(question);
          if (question.questionType === "text") {
            return (
              <TextQuestion
                key={index}
                index={index}
                question={question}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
                setAnswers={setAnswers}
              />
            );
          } else if (question.questionType === "singleCorrect") {
            return (
              <SingleCorrectQuestion
                key={index}
                index={index}
                question={question}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
                setAnswers={setAnswers}
              />
            );
          } else {
            return (
              <MultipeCorrectQuestion
                key={index}
                index={index}
                question={question}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
                setAnswers={setAnswers}
              />
            );
          }
        })
      )}
      {quizSubmited ? (
        <div className="flex">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="ml-2  mt-4 py-2 w-full bg-blue-500 font-bold text-white rounded"
          >
            Continue
          </button>
        </div>
      ) : (
        <button
          className="ml-2  mt-4 py-2 w-full font-bold bg-blue-500 text-white rounded"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading || loadingQuizAttempt ? <Spinner /> : " Submit"}
        </button>
      )}
    </div>
  );
}
