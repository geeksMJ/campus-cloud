import { RiDeleteBin6Fill } from "react-icons/ri";
import BackButton from "../../Common/Ui/BackButton";
import { useAllAdmin } from "../components/settings/useAllAdmin";
import Spinner from "../../Common/Ui/Spinner";
import { useDeleteAdmin } from "../components/settings/useDeleteAdmin";
import AddButton from "../ui/AddButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmDelete from "../ui/ConfirmDelete";

export default function ShowAllAdmin() {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { isLoading: loadingAllAdmin, allAdmin } = useAllAdmin();
  const { removeAdmin, isLoading: deletingAdmin } = useDeleteAdmin();
  const adminEmail = localStorage.getItem("adminEmail");

  if (loadingAllAdmin) return <Spinner />;
  return (
    <>
      <BackButton />
      <div className="min-h-screen w-full bg-white p-4">
        <div className="flex items-center justify-between w-full text-3xl font-bold mb-6 pr-20">
          <span>Admin List</span>
          <AddButton title="Admin" onClick={() => navigate("/admin/SignUp")} />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 w-2/5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 w-2/5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 w-1/5 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allAdmin.map((admin) => (
                <tr key={admin.adminEmail}>
                  <td className="px-5 py-3 w-2/5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {admin.adminName}
                    </p>
                  </td>
                  <td className="px-5 py-3 w-2/5 border-b border-gray-200 bg-white text-sm text-left">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {admin.adminEmail}
                    </p>
                  </td>
                  <td className="px-5 py-3 w-1/5 border-b border-gray-200 bg-white text-sm text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setConfirmDelete(admin.adminEmail);
                        }}
                        disabled={
                          deletingAdmin || adminEmail === admin.adminEmail
                        }
                        className={`flex items-center gap-2 ${
                          adminEmail === admin.adminEmail
                            ? "bg-red-200 hover:cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 hover:scale-110"
                        } text-white px-4 py-2 rounded-full `}
                      >
                        <span className="text-xl">
                          <RiDeleteBin6Fill />
                        </span>
                        <span className="font-semibold text-md">Remove</span>
                      </button>
                      {confirmDelete && (
                        <ConfirmDelete
                          what="Admin"
                          who={confirmDelete}
                          handelClick={() => {
                            removeAdmin({
                              adminEmail: confirmDelete,
                            });
                          }}
                          close={setConfirmDelete}
                        />
                      )}
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
