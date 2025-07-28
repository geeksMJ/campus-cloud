/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import EmployeeAppLayout from "./Employee/Ui/EmployeeAppLayout";
import Login from "./Employee/pages/Login";
import EmployeeInfo from "./Employee/pages/Employee_Info";
import PrivateRoute from "./Employee/Ui/PrivateRoute";
import Course from "./Employee/pages/Course";
import Quiz from "./Employee/pages/Quiz";
import AdminSignup from "./Admin/pages/AdminSignup";
import EmployeeSignup from "./Admin/pages/EmployeeSignup";
import PageNotFound from "./Common/Ui/PageNotFound";
import AdminAppLayout from "./Admin/ui/AdminAppLayout";
import Tracking from "./Admin/pages/Tracking";
import EmployeeCourses from "./Employee/pages/EmployeeCourses";
import AdminCourses from "./Admin/pages/AdminCourses";
import Quizzes from "./Admin/pages/Quizzes";
import Users from "./Admin/pages/Users";
import EmployeeSettings from "./Employee/pages/EmployeeSettings";
import AdminSettings from "./Admin/pages/AdminSettings";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import EmployeeDashboard from "./Employee/pages/EmployeeDashboard";
import AddDetertment from "./Admin/pages/AddDetertment";
import ShowAllAdmin from "./Admin/pages/ShowAllAdmin";
import ShowAllEmployee from "./Admin/pages/ShowAllEmployee";
import ShowAllDepartment from "./Admin/pages/ShowAllDepartment";
import CreateQuiz from "./Admin/pages/CreateQuiz";
import ViewQuiz from "./Admin/pages/ViewQuiz";
import EditQuiz from "./Admin/pages/EditQuiz";
import AddFullCourse from "./Admin/pages/AddFullCourse";
import Protected from "./Employee/Ui/Protected";
import Request from "./Admin/pages/Request";
import Certificate from "./Common/Ui/Certificate";
import ShowAnswers from "./Admin/components/quiz/ShowAnswers";

import AdminWatchCourse from "./Admin/components/courses/AdminWatchCourse";

import AdminChangePassword from "./Admin/components/settings/AdminChangePassword";
import CertificateBackground from "./Admin/pages/CertificateBackground";
import UploadCSV from "./Admin/pages/UploadCSV";
import EmployeeQuiz from "./Employee/pages/EmployeeQuiz";
import LandingPage from "./Employee/pages/LandingPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}  />
          <Route path="/login" element={<Login />} />
          <Route
            path="/certificate/:name/:courseName/:depertment"
            element={<Certificate />}
          />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          {/* ------------------------------- Employee  Routes ------------------------------- */}
          <Route
            element={
              <PrivateRoute>
                <EmployeeAppLayout />
              </PrivateRoute>
            }
          >
            <Route path="employee/" element={<Navigate to="dashboard" />} />
            <Route path="employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="employee/profile" element={<EmployeeInfo />} />
            <Route path="employee/course/:courseId" element={<Course />} />
            <Route path="employee/courses" element={<EmployeeCourses />} />
            <Route path="employee/settings" element={<EmployeeSettings />} />
            <Route path="employee/quiz" element={<EmployeeQuiz />} />
            <Route path="employee/quiz/:quizId" element={<Quiz />} />
          </Route>
          {/* ------------------------------- Admin  Routes ------------------------------- */}
          <Route
            element={
              <Protected>
                <AdminAppLayout />
              </Protected>
            }
          >
            <Route path="admin/" element={<Navigate to="dashboard" />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/tracking" element={<Tracking />} />
            <Route path="admin/courses" element={<AdminCourses />} />
            <Route path="admin/quizzes" element={<Quizzes />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/settings" element={<AdminSettings />} />
            <Route path="admin/request" element={<Request />} />
            <Route path="admin/SignUp" element={<AdminSignup />} />
            <Route
              path="admin/course/:courseId"
              element={<AdminWatchCourse />}
            />
            <Route path="admin/employeeSignUp" element={<EmployeeSignup />} />
            <Route
              path="admin/updateEmployee/:empId"
              element={<EmployeeSignup editing={true} />}
            />
            <Route path="admin/addDepartment" element={<AddDetertment />} />
            <Route path="admin/showAllAdmin" element={<ShowAllAdmin />} />
            <Route path="admin/quizzes/createQuiz" element={<CreateQuiz />} />
            <Route
              path="admin/quizzes/ShowAnswers/:responseId"
              element={<ShowAnswers />}
            />
            <Route
              path="admin/quizzes/viewQuiz/:quizId"
              element={<ViewQuiz />}
            />
            <Route
              path="admin/quizzes/editQuiz/:quizId"
              element={<EditQuiz />}
            />
            <Route
              path="admin/showAllEmployee"
              element={<ShowAllEmployee title="Employee List" />}
            />
            <Route
              path="admin/showAllDepartment"
              element={<ShowAllDepartment />}
            />
            <Route path="admin/addCourse" element={<AddFullCourse />} />
            <Route
              path="admin/setting/changepassword"
              element={<AdminChangePassword />}
            />
            <Route
              path="admin/setting/certificate-image"
              element={<CertificateBackground />}
            />
            <Route path="admin/setting/upload-bulk" element={<UploadCSV />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
          style={{
            fontSize: "16px",
            maxWidth: "1000px",
            margin: "0 50px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "black",
          }}
          toastStyle={{
            backgroundColor: "white",
            color: "black",
            padding: "16px 24px",
          }}
        />

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            duration: 5000, // Matches autoClose duration
            style: {
              fontSize: "16px",
              maxWidth: "700px",
              margin: "0 50px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "black",
            },
            success: {
              duration: 3000, // Specific for success
            },
            error: {
              duration: 5000, // Specific for error
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
