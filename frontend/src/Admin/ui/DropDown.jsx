import SpinnerMini from "../../Common/Ui/SpinnerMini";
import { useAllDepartment } from "../components/settings/useAllDepartment";

/* eslint-disable react/prop-types */
const Dropdown = ({ selectedOption, setSelectedOption, uploading = false }) => {
  const { isLoading: loadingAllDepartment, allDepartment } = useAllDepartment();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  if (loadingAllDepartment) return <SpinnerMini />;
  return (
    <div className="w-full ">
      <select
        className="w-full border p-2 rounded shadow"
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Select A Department</option>
        {uploading && (
          <>
            <option value="all_department">To All Department</option>
            <option value="no_department">none</option>
          </>
        )}
        {allDepartment.map((department) => (
          <option
            key={department.departmentName}
            value={department.departmentName}
          >
            {department.departmentName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
