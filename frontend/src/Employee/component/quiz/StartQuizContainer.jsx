import { useNavigate } from "react-router-dom";

export default function StartQuizContainer() {
  const navigate = useNavigate();
  return (
    <div className="w-1/2 p-2">
      <div className="shadow-lg shadow-stone-300 border rounded-md p-3">
        <p className="text-lg font-bold py-1">Quiz:1</p>
        <p className="text-md  py-1 ">
          Test your knowledge on the basis of this module
        </p>
        <button
          className=" bg-blue-600 text-slate-50 text-md font-bold rounded-lg py-1 px-2 my-2"
          onClick={() => {
            navigate("/employee/quiz");
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
