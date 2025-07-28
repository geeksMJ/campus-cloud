/* eslint-disable react/prop-types */
// src/components/OngoingCourseCard.jsx

export default function OngoingCourseCard({ title, progress }) {
  return (
    <div className="bg-gray-100 h-20 md:p-4 p-2 rounded-lg shadow-lg flex items-center justify-between">
      <div className="flex justify-center h-10 w-10 rounded">
        <img src="./default_image.png" alt="thumbnail" />
      </div>
      <div className=" w-4/5 pr-4 pl-2">
        <h3 className="text-sm md:text-xl font-bold">{title}</h3>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap rounded text-white justify-center bg-blue-600"
            ></div>
          </div>
          <div className="text-xs md:text-base">{progress} % complete</div>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 w-1/5 text-white font-semibold md:py-2 py-1 text-sm md:text-base md:px-4 px-1 rounded">
        Continue Learning
      </button>
    </div>
  );
}
