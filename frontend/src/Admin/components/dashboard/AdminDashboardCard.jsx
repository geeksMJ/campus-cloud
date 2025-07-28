/* eslint-disable react/prop-types */
import { FaBook } from "react-icons/fa6";
export default function AdminDashboardCard({ title, number, color }) {
  return (
    <div className={`shadow-md flex rounded-lg p-4 ${color}`}>
      <div
        className={`text-4xl p-2 rounded-full border mr-2 bg-slate-100 text-gray-800`}
      >
        <FaBook />
      </div>
      <div>
        <h2 className="text-gray-700 font-semibold"> {title}</h2>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
}
