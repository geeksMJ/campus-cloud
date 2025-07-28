/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import CreateQuizCard from "../components/quiz/CreateQuizCard";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import BackButton from "../../Common/Ui/BackButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUploadQuiz } from "../components/quiz/useUploadQuiz";
import { IoCreateOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function CreateQuiz() {
  const [quizCards, setQuizCards] = useState([1]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { uploadQuiz, isLoading } = useUploadQuiz();
  const [questions, setQuestions] = useState([]);
  console.log(questions);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function checkSubmit(data) {
    console.log("submit", { title: data.name, questions: questions });
    uploadQuiz({ title: data.name, questions: questions });
    navigate("/admin/quizzes");
  }

  function addQuizCard() {
    setQuizCards((prevCards) => [...prevCards, prevCards.length + 1]);
  }

  function removeQuizCard() {
    setQuizCards((prevCards) =>
      prevCards.length > 1 ? prevCards.slice(0, -1) : prevCards
    );
  }

  function optionHandler(event) {
    const { value } = event.target;
    setSelectedType(value);
  }

  return (
    <div className="min-h-screen w-full bg-white p-4 mb-40">
      <div className="flex items-center justify-between w-full text-3xl font-bold mb-3 pr-20">
        <h1 className="text-3xl font-bold mb-3">Create Quiz</h1>
        <div className="flex h-10 gap-2">
          <div>
            <button
              className="bg-red-600 text-sm font-semibold text-white py-1 px-2 mx-1 rounded-md cursor-pointer flex justify-center items-center"
              onClick={() => removeQuizCard()}
            >
              <IoIosRemoveCircleOutline />
              Remove Question
            </button>
          </div>
          <div>
            <button
              className="bg-blue-600 text-sm font-semibold text-white py-1 px-2 mx-1 rounded-md cursor-pointer flex justify-center items-center"
              onClick={() => addQuizCard()}
            >
              <IoIosAddCircleOutline />
              Add Question
            </button>
          </div>
          <div>
            <BackButton />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 w-full shadow-md px-4 py-2 ">
        <form onSubmit={handleSubmit(checkSubmit)}>
          <div className="p-2">
            <div className="flex justify-between mb-2">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="quizname"
              >
                Quiz Title
              </label>
              <div className="">
                <button
                  type="submit"
                  className={`flex items-center justify-center gap-1 text-white font-bold rounded-full px-3 h-8 text-center mr-1 
                    ${isSubmitted ? "bg-gray-400" : "bg-green-600"}`}
                  disabled={isSubmitted}
                  style={{ cursor: isSubmitted ? "not-allowed" : "pointer" }}
                >
                  <span>
                    <IoCreateOutline className="text-lg" />{" "}
                    {/* Optional: Adjust icon size if needed */}
                  </span>
                  <span>Create Quiz</span>
                </button>
              </div>
            </div>
            <input
              type="text"
              id="quizname"
              placeholder="Enter Quiz Title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={optionHandler}
              disabled={isSubmitted}
              style={{ cursor: isSubmitted ? "not-allowed" : "text" }}
              {...register("name", {
                required: "This field is required",
              })}
            />
          </div>
        </form>

        <div className="">
          {quizCards.map((card, index) => (
            <CreateQuizCard
              key={index}
              index={index + 1}
              setQuestions={setQuestions}
              // onClickSaveHandler={saveHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
