import { useState } from "react";

/* eslint-disable react/prop-types */
export default function ShowTextAnswer({ question, index, setAnswers }) {
  const [answer, setAnswer] = useState("");

  console.log("Questions are here ", question);

  return (
    <div className="w-full m-2 p-2 bg-gray-200 border rounded-md">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={`question-${index}`}
      >
        Question {index}: {question.question}
      </label>
      <input
        type="text"
        id={`question-${index}`}
        defaultValue={question.correctAnswer}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}
