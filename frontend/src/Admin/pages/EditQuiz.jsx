import EditTextQuestion from "../components/quiz/EditTextQuestion";
import EditSingleCorrectQuestion from "../components/quiz/EditSingleCorrectQuestion";
import EditMultipeCorrectQuestion from "../components/quiz/EditMultipeCorrectQuestion";
import { IoCreateOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizId } from "../components/quiz/useQuizById";
import Spinner from "../../Common/Ui/Spinner";
import { useAddModuleInQuiz } from "../../Admin/components/quiz/useAddModuleInQuiz";

export default function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { isloading, quiz } = useQuizId(quizId);
  const { addModuleInQuiz, isLoading } = useAddModuleInQuiz();

  const { register, handleSubmit } = useForm();

  function checkSubmit(data) {
    console.log(data);
    addModuleInQuiz(
      {
        quizId: quizId,
        title: data.title,
        questions: data.questions,
      },
      {
        onSuccess: () => {
          navigate("/admin/quizzes");
        },
      }
    );
  }
  if (isloading) return <Spinner />;

  return (
    <div className="min-h-screen w-full bg-white p-4">
      <div className="flex items-center justify-between w-full text-3xl font-bold mb-3 pr-20">
        <h1 className="text-3xl font-bold mb-3">Edit Quiz</h1>
      </div>
      <form onSubmit={handleSubmit(checkSubmit)}>
        <div className="px-6 py-4  w-full bg-gray-100 h-fit">
          <div className="mb-2">
            <div className="flex justify-between mb-0">
              <label
                className="block text-gray-700 text-lg font-bold mb-"
                htmlFor="quizTitle"
              >
                Quiz Title
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-18 gap-1 text-white font-bold rounded-full px-3 py-1 mb-1 mr-1 bg-green-600 `}
              >
                <span className="mt-1">
                  <IoCreateOutline />
                </span>
                Update Quiz
              </button>
            </div>
            <input
              type="text"
              id="quizTitle"
              className="shadow appearance-none border rounded w-full py-2  mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={quiz.title}
              {...register("title", {
                required: "This field is required",
              })}
            />
          </div>

          {quiz.questions.map((quiz, index) => {
            if (quiz?.questionType === "text") {
              return (
                <EditTextQuestion
                  key={index} // Add key prop here
                  index={index}
                  quiz={quiz}
                  register={register}
                />
              );
            } else if (quiz?.questionType === "singleCorrect") {
              return (
                <EditSingleCorrectQuestion
                  key={index} // Add key prop here
                  index={index}
                  quiz={quiz}
                  register={register}
                />
              );
            } else {
              return (
                <EditMultipeCorrectQuestion
                  key={index} // Add key prop here
                  index={index}
                  quiz={quiz}
                  register={register}
                />
              );
            }
          })}
        </div>
      </form>
    </div>
  );
}
