/* eslint-disable react/prop-types */
import { MdAdd } from "react-icons/md";

export default function AddButton({ title, onClick }) {
  return (
    <button
      className="bg-green-600 text-white rounded-full px-2 pr-3  py-1 hover:scale-110 hover:bg-green-700"
      onClick={onClick}
    >
      <div className="text-sm flex justify-center items-center">
        <span className="text-lg font-bold">
          <MdAdd />
        </span>
        Add {title}
      </div>
    </button>
  );
}
