/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import MultipleCorrectOption from "./MultipleCorrectOption";
import SingleCorrectOption from "./SingleCorrectOption";
import toast from "react-hot-toast";

export default function CreateQuizCard({ index, setQuestions }) {
  const [selectedType, setSelectedType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function checkSubmit(data) {
    if (!data.questionType) {
      console.log("ye le inside if ", data);
      toast.error("Error in adding quiz");
      setIsSubmitted(false);
    } else {
      console.log("ye le outside if ", data);
      toast.success("Question added ");
      setQuestions((prev) => [...prev, data]);

      setIsSubmitted(true);
    }
  }

  function optionHandler(event) {
    // const value = e.target.value === "" ? null : e.target.value;
    // console.log(value); // Logs null initially, or the selected value
    const { value } = event.target;
    value === "" ? null : event.target;
    console.log(value); // Logs null initially, or the selected value

    setSelectedType(value);
  }

  return (
    <div className="m-2 h-auto mb-14 bg-blue-100 rounded">
      <form onSubmit={handleSubmit(checkSubmit)}>
        <div className="p-2">
          <div className="flex justify-between">
            <div
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quizname"
            >
              Question {index}
            </div>
            <div className="gap-3 mb-2 flex">
              <label htmlFor="anstype" className="pt-1">
                Select answer type:{" "}
              </label>
              <select
                className="ml-2 rounded border-black"
                id="anstype"
                {...register("questionType", {
                  required: "Answer type is required",
                })}
                onChange={optionHandler}
                disabled={isSubmitted}
                style={{ cursor: isSubmitted ? "not-allowed" : "pointer" }}
              >
                <option value="">Select</option>
                {/* <option value="text">Text</option> */}
                <option value="singleCorrect">Single Correct</option>
                <option value="multipleCorrect">Multiple Correct</option>
              </select>
              {errors.anstype && (
                <p className="text-red-500 text-sm">{errors.anstype.message}</p>
              )}
              <div>
                <button
                  type="submit"
                  className={`flex items-center justify-center gap-1 text-white rounded-full px-3 py-1 
            ${!selectedType || isSubmitted ? "bg-gray-400" : "bg-green-600"}`}
                  disabled={!selectedType || isSubmitted}
                  style={{
                    cursor:
                      !selectedType || isSubmitted ? "not-allowed" : "pointer",
                  }}
                >
                  <span className="flex items-center">
                    <FaSave className="text-lg" />{" "}
                    {/* Optional: Adjust icon size if needed */}
                  </span>
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
          <label
            className="block text-gray-700 text-sm font-bold px-1"
            htmlFor="quizname"
          >
            Enter Your Question
          </label>
          <input
            type="text"
            id="quizname"
            placeholder="Enter Question"
            disabled={!selectedType || isSubmitted}
            style={{
              cursor: !selectedType || isSubmitted ? "not-allowed" : "text",
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("question", { required: "Question is required" })}
          />
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question.message}</p>
          )}
        </div>
        <div className="p-2">
          {selectedType === "text" ? (
            <div>
              <label
                className="block text-gray-700 text-sm font-bold px-2"
                htmlFor="quizname"
              >
                Enter Correct Answer
              </label>
              <input
                type="text"
                id="quizoption1"
                placeholder="Enter Answer"
                className="shadow my-1 appearance-none border rounded-full w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("correctAnswer", {
                  required: "Answer is required",
                })}
                disabled={isSubmitted}
                style={{
                  cursor: isSubmitted ? "not-allowed" : "default",
                }}
              />
              {errors.answer && (
                <p className="text-red-500 text-sm">{errors.answer.message}</p>
              )}
            </div>
          ) : selectedType === "singleCorrect" ? (
            <div>
              <SingleCorrectOption
                ansIndex="1"
                isSubmitted={isSubmitted}
                register={register}
                setValue={setValue}
              />
              <SingleCorrectOption
                ansIndex="2"
                isSubmitted={isSubmitted}
                register={register}
                setValue={setValue}
              />
              <SingleCorrectOption
                ansIndex="3"
                isSubmitted={isSubmitted}
                register={register}
                setValue={setValue}
              />
              <SingleCorrectOption
                ansIndex="4"
                isSubmitted={isSubmitted}
                register={register}
                setValue={setValue}
              />
            </div>
          ) : selectedType === "multipleCorrect" ? (
            <div>
              <MultipleCorrectOption
                ansIndex="1"
                isSubmitted={isSubmitted}
                register={register}
              />
              <MultipleCorrectOption
                ansIndex="2"
                isSubmitted={isSubmitted}
                register={register}
              />
              <MultipleCorrectOption
                ansIndex="3"
                isSubmitted={isSubmitted}
                register={register}
              />
              <MultipleCorrectOption
                ansIndex="4"
                isSubmitted={isSubmitted}
                register={register}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </form>
    </div>
  );
}
