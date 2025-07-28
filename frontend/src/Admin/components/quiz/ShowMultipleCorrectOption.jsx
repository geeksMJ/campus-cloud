/* eslint-disable react/prop-types */
import React from "react";

export default function ShowMultipleCorrectOption({ question, index }) {
  return (
    <div className="w-full m-2 p-2 border bg-gray-200 rounded-md">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Question {index + 1}: {question.question}
      </label>

      <div className="mb-2">
        <label className="inline-flex items-center gap-2">
          Option 1:
          <input
            type="checkbox"
            name="option1"
            checked={question.correctAnswer.includes("option1")}
            readOnly
            className="form-checkbox"
          />
          <span className="ml-0">{question.option1}</span>
        </label>
      </div>

      <div className="mb-2">
        <label className="inline-flex items-center gap-2">
          Option 2:
          <input
            type="checkbox"
            name="option2"
            checked={question.correctAnswer.includes("option2")}
            readOnly
            className="form-checkbox"
          />
          <span className="ml-0">{question.option2}</span>
        </label>
      </div>

      <div className="mb-2">
        <label className="inline-flex items-center gap-2">
          Option 3:
          <input
            type="checkbox"
            name="option3"
            checked={question.correctAnswer.includes("option3")}
            readOnly
            className="form-checkbox"
          />
          <span className="ml-0">{question.option3}</span>
        </label>
      </div>

      <div className="mb-2">
        <label className="inline-flex items-center gap-2">
          Option 4:
          <input
            type="checkbox"
            name="option4"
            checked={question.correctAnswer.includes("option4")}
            readOnly
            className="form-checkbox"
          />
          <span className="ml-0">{question.option4}</span>
        </label>
      </div>
    </div>
  );
}
