import { RiDeleteBin6Fill } from "react-icons/ri";
import Spinner from "../../Common/Ui/Spinner";
import { useAllDepartment } from "../components/settings/useAllDepartment";
import { useDeleteDepartment } from "../components/settings/useDeleteDepartment";
import BackButton from "../../Common/Ui/BackButton";
import AddButton from "../ui/AddButton";
import { useNavigate } from "react-router-dom";

export default function ShowAllDepartment() {
  const navigate = useNavigate();
  const { isLoading: loadingAllDepartment, allDepartment } = useAllDepartment();
  const { removeDepartment, isLoading: deletingDepartment } =
    useDeleteDepartment();

    // console.log(allDepartment);

  if (loadingAllDepartment) return <Spinner />;
  return (
    <>
      <BackButton />
      <div className="min-h-screen w-full bg-white p-4">
        <div className="flex items-center justify-between w-full text-3xl font-bold mb-6 pr-20">
          <span>Department List</span>
          <AddButton
            title="Department"
            onClick={() => navigate("/admin/addDepartment")}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 w-2/5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>

                <th className="px-5 py-3 w-1/5 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allDepartment.map((department) => (
                <tr key={department.departmentName}>
                  <td className="px-5 py-3 w-2/5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900  whitespace-no-wrap">
                      {department.departmentName}
                    </p>
                  </td>

                  <td className="px-5 py-3 w-1/5 border-b border-gray-200 bg-white text-sm text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          removeDepartment({
                            departmentName: department.departmentName,
                          });
                        }}
                        disabled={deletingDepartment}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 hover:scale-110"
                      >
                        <span className="text-xl">
                          <RiDeleteBin6Fill />
                        </span>
                        <span className="font-semibold text-md">Remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
