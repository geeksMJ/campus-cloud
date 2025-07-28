import Container from "../components/settings/Container";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { useBulkEmployees } from "../components/settings/useBulkEmployee";
import { useState } from "react";
import SpinnerMini from "../../Common/Ui/SpinnerMini";
import toast from "react-hot-toast";

export default function AddUserAdmin() {
  const navigate = useNavigate();
  const { bulkEmployees, isLoading } = useBulkEmployees();
  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the uploaded file is a CSV
    if (selectedFile && selectedFile.type !== "text/csv") {
      toast.error("Please upload a valid CSV file.");
      setFile(null);
      e.target.value = null; // Reset the input
      return;
    }
    setFile(selectedFile);

    if (selectedFile) {
      bulkEmployees(selectedFile);
      setFile(null); 
      e.target.value = null; 
    }
  };


  return (
    <div className={`w-full p-4`}>
      <div className="w-full">
        <h1 className="text-3xl font-bold ">Admin Settings</h1>
      </div>
      <div className="w-full pt-6 min-h-screen">
        <Container
          title="Department"
          addButtonClickHandler={() => navigate("/admin/addDepartment")}
          showMoreButtonClickHandler={() =>
            navigate("/admin/showAllDepartment")
          }
        />
        <Container
          title="Admin"
          addButtonClickHandler={() => navigate("/admin/SignUp")}
          showMoreButtonClickHandler={() => navigate("/admin/showAllAdmin")}
        />

        <Container
          title="Employee"
          addButtonClickHandler={() => navigate("/admin/employeeSignUp")}
          showMoreButtonClickHandler={() => navigate("/admin/showAllEmployee")}
        />
        <div className="mb-2 rounded shadow-md">
          <div className="flex justify-between items-center w-full rounded pr-8 py-4 px-6 bg-gray-100 h-13">
            <h2 className="text-xl font-bold">Add Bulk Employees</h2>
            <div className="flex items-center space-x-4 ">
              <label
                htmlFor="file-upload"
                className="flex items-center bg-blue-600 text-white px-10 py-2 h-10 text-sm font-bold rounded-full cursor-pointer hover:bg-blue-700 hover:scale-110"
              >
                 {isLoading ? (
                  <SpinnerMini />
                ) : (
                  <>
                    <MdFileUpload className="mr-2" />
                    <span>Upload CSV</span>
                  </>
                )}
              </label>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />
               
              {file && <div className="text-gray-700 text-sm">{file.name}</div>}
            </div>
          </div>
        </div>
        <div className="mb-2 rounded shadow-md">
          <div className="flex justify-between items-center w-full rounded py-4 px-6 bg-gray-100 h-13">
            <h2 className="text-xl font-bold">Certificate Background</h2>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  navigate("/admin/setting/certificate-image");
                }}
                className="bg-blue-600 text-white px-3 mx-1 py-1 h-10 text-sm font-bold rounded-full hover:bg-blue-700 hover:scale-110"
              >
                <div className=" flex justify-center items-center">
                  <MdAdd />
                  <span className="px-1">Change Background</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="mb-2 rounded shadow-md">
          <div className="flex justify-between items-center w-full rounded py-4 px-6 bg-gray-100 h-13">
            <h2 className="text-xl font-bold">Change Password</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  navigate("/admin/setting/changepassword");
                }}
                className="bg-blue-600 text-white px-7 mx-1 py-1 h-10 text-sm font-bold rounded-full hover:bg-blue-700 hover:scale-110"
              >
                <div className=" flex justify-center items-center">
                  <span className="px-1">Change Password</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
