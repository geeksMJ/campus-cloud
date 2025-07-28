import { useState } from "react";
import Dropdown from "../../ui/DropDown";
import AdminDashboardPercent from "../dashboard/AdminDashboardPercent";

export default function TrackByDepartment() {
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="bg-gray-50 h-auto shadow-md rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-6">Track by username</h1>
      </div>
      <div className="pb-3">
        <Dropdown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <AdminDashboardPercent
          percent="39"
          description="completed the course"
        />
        <AdminDashboardPercent
          percent="75"
          description="completed the course"
        />
      </div>
    </div>
  );
}
