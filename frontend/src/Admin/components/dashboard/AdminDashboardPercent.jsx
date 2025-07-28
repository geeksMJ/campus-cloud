/* eslint-disable react/prop-types */
export default function AdminDashboardPercent({
  description,
  percent = 0,
  showProgressBar = true,
}) {
  return (
    <div className="bg-blue-100 text-blue-700 rounded-lg p-4">
      <div className="flex justify-between items-center ">
        <span>
          {showProgressBar && "% of students "}
          {description}
        </span>
        <span className="font-bold">
          {percent}
          {showProgressBar && "%"}
        </span>
      </div>
      {showProgressBar && (
        <div className="w-full mt-2 bg-blue-300 rounded-full h-2.5">
          <div
            className="bg-blue-700 rounded-full h-2.5"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  );
}
