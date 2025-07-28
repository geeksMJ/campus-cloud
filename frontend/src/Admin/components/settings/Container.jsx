/* eslint-disable react/prop-types */
import { MdAdd } from "react-icons/md";

export default function Container({
  title,
  addButtonClickHandler,
  showMoreButtonClickHandler,
}) {
  return (
    <div className="mb-2 rounded shadow-md">
      <div className="flex justify-between items-center w-full rounded py-4 px-6 bg-gray-100 h-13">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={addButtonClickHandler}
            className="bg-blue-600 text-white px-4 py-1 h-10 text-sm font-bold rounded-full hover:bg-blue-700 hover:scale-110"
          >
            <div className=" flex justify-center items-center">
              <MdAdd />
              Add
            </div>
          </button>
          <button
            onClick={showMoreButtonClickHandler}
            className="bg-yellow-500 text-white px-4 py-1 h-10 text-sm font-bold rounded-full hover:bg-yellow-600  hover:scale-110"
          >
            Show All
          </button>
        </div>
      </div>
    </div>
  );
}
