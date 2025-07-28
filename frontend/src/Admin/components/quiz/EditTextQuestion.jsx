import React from "react";

export default function EditTextQuestion({ quiz, index, register }) {
  return (
    <div className="mb-6 p-4 border rounded bg-blue-100 shadow">
      <div className="mb-4">
        <label
          className="block text-lg font-semibold mb-2"
          htmlFor={`question-${index}`}
        >
          Question: {index}
        </label>
        <input
          type="text"
          id={`question-${index}`}
          className="shadow my-1 appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={quiz.question}
          {...register(`questions[${index}].question`)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-lg font-semibold mb-2"
          htmlFor={`answer-${index}`}
        >
          Answer: {index}
        </label>
        <input
          type="text"
          id={`answer-${index}`}
          className="shadow my-1 appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={quiz.correctAnswer}
          {...register(`questions[${index}].correctAnswer`)}
        />
      </div>
    </div>
  );
}
