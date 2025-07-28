/* eslint-disable react/prop-types */

export default function SingleCorrectOption({
  ansIndex,
  isSubmitted,
  register,
  setValue,
}) {
  return (
    <div className="flex w-full gap-3">
      <div className="w-2/3">
        <label
          className="block text-gray-700 text-sm font-bold px-2"
          htmlFor="quizname"
        >
          Option {ansIndex}
        </label>
        <input
          type="text"
          id={`quizoption${ansIndex}`}
          placeholder={`Enter Option ${ansIndex}`}
          className="shadow my-1 appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register(`option${ansIndex}`, {
            required: `Option ${ansIndex} is required`,
          })}
          disabled={isSubmitted}
          style={{
            cursor: isSubmitted ? "not-allowed" : "text",
          }}
        />
      </div>
      <div className="pt-2 gap-2 flex items-center">
        <label htmlFor={`correctOption${ansIndex}`}>Correct Answer:</label>
        <input
          type="radio"
          id={`correctOption${ansIndex}`}
          value={`option${ansIndex}`}
          name="correctOptionSingle"
          className="ml-2"
          disabled={isSubmitted}
          style={{
            cursor: isSubmitted ? "not-allowed" : "default",
          }}
          onChange={() => setValue("correctAnswer", `option${ansIndex}`)}
          {...register("correctAnswer", {
            required: "Correct answer is required",
          })}
        />
      </div>
    </div>
  );
}
