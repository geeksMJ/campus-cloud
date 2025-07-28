import { useState } from "react";
import TrackByCourse from "../components/tracking/TrackByCourse";
import TrackByDepartment from "../components/tracking/TrackByDepartment";
import TrackByEmployee from "../components/tracking/TrackByEmployee";

export default function Tracking() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full">
      <div className="min-h-screen w-full bg-white p-4">
        <div className="flex justify-between items-center p-2 rounded-lg shadow bg-slate-100 mb-3">
          <h1 className="text-3xl font-bold">Tracking</h1>
          <div className="w-4/12 border rounded">
            <select
              className=" w-full border p-2 rounded shadow"
              id="dropdown"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="">Track By</option>
              <option value="Course">Track By Course</option>
              <option value="Employee">Track By Student</option>
              <option value="Department">Track By Department</option>
            </select>
          </div>
        </div>

        {/* Conditionally render components based on selected option */}
        {(!selectedOption || selectedOption === "Course") && <TrackByCourse />}
        {(!selectedOption || selectedOption === "Employee") && (
          <TrackByEmployee />
        )}
        {(!selectedOption || selectedOption === "Department") && (
          <TrackByDepartment />
        )}
      </div>
    </div>
  );
}
