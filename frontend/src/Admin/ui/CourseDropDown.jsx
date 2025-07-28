import SpinnerMini from "../../Common/Ui/SpinnerMini";
import { useAllCourse } from "../components/courses/useAllCourse";

/* eslint-disable react/prop-types */
const CourseDropdown = ({ selectedOption, setSelectedOption }) => {
  const { isLoading, allCourse } = useAllCourse();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  if (isLoading) return <SpinnerMini />;

  return (
    <div className="w-full ">
      <select
        className="w-full border p-2 rounded shadow"
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Select A Course</option>
        {allCourse.map((course) => (
          <option key={course.courseTitle} value={course._id}>
            {course.courseTitle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseDropdown;
