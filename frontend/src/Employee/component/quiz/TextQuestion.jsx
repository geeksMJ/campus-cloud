import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
export default function TextQuestion({ question, index, setAnswers }) {
  const [answer, setAnswer] = useState("");

  console.log("Questions are here ", question);

  const handleInputChange = (e) => {
    const newAnswer = e.target.value;
    setAnswer(newAnswer);

    // Update the answers array with the new answer, and add userAnswer to the question object
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const updatedQuestion = {
        ...updatedAnswers[index],
        userAnswer: newAnswer,
      };
      updatedAnswers[index] = updatedQuestion;
      return updatedAnswers;
    });
  };

  useEffect(() => {
    // Ensure that setAnswers has an entry for this question when it first renders
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      if (!updatedAnswers[index]) {
        updatedAnswers[index] = { ...question, userAnswer: "" };
      }
      return updatedAnswers;
    });
  }, [index, setAnswers, question]);

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
        value={answer}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}
