/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function SingleCorrectQuestion({ question, index, setAnswers }) {
  const [selectedOption, setSelectedOption] = useState("");

  // console.log("Questions are here ", question);

  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);

    // Update the answers array with the new selected option as userAnswer
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const updatedQuestion = {
        ...updatedAnswers[index],
        userAnswer: newSelectedOption,
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
    <>
      {/* Keyframe Animation Styles */}
      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes textSlideIn {
            0% {
              transform: translateX(-50%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          
        `}
      </style>

      <div
        className="w-full mb-2 p-4 bg-secondary2 text-testColor1 text-opacity-80 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        style={{
          animation: "slideIn 0.5s ease-out",
        }}
      >
        <label
          className="block text-lg font-semibold text-testColor1 mb-4"
          style={{
            animation: "textSlideIn 0.7s ease-out",
          }}
        >
          Question {index + 1}: {question.question}
        </label>

        {/* Option 1 */}
        <div
          className="mb-2"
          style={{ animation: "textSlideIn 0.7s ease-out" }}
        >
          <label className="inline-flex items-center gap-2 w-full ">
            <div className="w-24 flex">
              <span className="mr-3 text-sm md:text-base md:w-20">
                Option 1:
              </span>
              <input
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
                className="form-radio"
              />
            </div>
            <span className="ml-0 w-3/4 text-sm md:text-base md:w-full">
              {question.option1}
            </span>
          </label>
        </div>

        {/* Option 2 */}
        <div
          className="mb-2"
          style={{ animation: "textSlideIn 0.7s ease-out" }}
        >
          <label className="inline-flex items-center gap-2 w-full ">
            <div className="w-24 flex">
              <span className="mr-2 text-sm md:text-base md:w-20">
                Option 2:
              </span>
              <input
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
                className="form-radio"
              />
            </div>
            <span className="ml-0 w-3/4 text-sm md:text-base md:w-full">
              {question.option2}
            </span>
          </label>
        </div>

        {/* Option 3 */}
        <div
          className="mb-2"
          style={{ animation: "textSlideIn 0.7s ease-out" }}
        >
          <label className="inline-flex items-center gap-2 w-full ">
            <div className="w-24 flex">
              <span className="mr-2 text-sm md:text-base md:w-20">
                Option 3:
              </span>
              <input
                type="radio"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={handleOptionChange}
                className="form-radio"
              />
            </div>
            <span className="ml-0 w-3/4 text-sm md:text-base md:w-full">
              {question.option3}
            </span>
          </label>
        </div>

        {/* Option 4 */}
        <div
          className="mb-2"
          style={{ animation: "textSlideIn 0.7s ease-out" }}
        >
          <label className="inline-flex items-center gap-2 w-full ">
            <div className="w-24 flex">
              <span className="mr-2 text-sm md:text-base md:w-20 ">
                Option 4:
              </span>
              <input
                type="radio"
                value="option4"
                checked={selectedOption === "option4"}
                onChange={handleOptionChange}
                className="form-radio"
              />
            </div>
            <span className="ml-0 w-3/4 text-sm md:text-base md:w-full">
              {question.option4}
            </span>
          </label>
        </div>
      </div>
    </>
  );
}
