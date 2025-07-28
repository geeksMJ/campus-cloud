import BackButton from "../../Common/Ui/BackButton";
import { IoMdDoneAll } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useAllRequest } from "../components/requests/useAllRequests";
import Spinner from "../../Common/Ui/Spinner";
import { useDeleteRequest } from "../components/requests/useDeleteRequest";
import { PiEmptyBold } from "react-icons/pi";
import { useAssignCourse } from "../components/employee/useAssignCourse";
import { useNavigate } from "react-router-dom";
import { useQuizRequest } from "../components/requests/useQuizRequest";
import toast from "react-hot-toast";

export default function Request() {
  const navigate = useNavigate();
  const { isLoading: loadingRequests, allRequest } = useAllRequest();
  const { removeRequest, isLoading: deletingRequest } = useDeleteRequest();
  const { assignCourse, isLoading } = useAssignCourse();
  const { quizRequest, isLoading: accepting } = useQuizRequest();

  if (loadingRequests) return <Spinner />;

  return (
    <>
      <BackButton />
      <div className="min-h-screen w-full bg-white p-4">
        <div className="flex items-center justify-between w-full text-3xl font-bold mb-6 pr-20">
          <span>Requests</span>
        </div>

        {allRequest.length === 0 ? (
          <div className="w-full pt-64 flex items-center justify-center">
            <div>
              <div className="w-full flex items-center justify-center">
                <p className="text-8xl">
                  <PiEmptyBold />
                </p>
              </div>
              <p className="text-3xl pt-2 p-4 font-medium">No Requests</p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 w-1/4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 py-3 w-2/4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-5 py-3 w-1/4 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allRequest.map((request) => (
                  <tr key={request._id}>
                    <td className="px-5 py-3 w-1/4 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {request.employeeName} ({request.empId})
                      </p>
                    </td>
                    <td className="px-5 py-3 w-2/4 border-b border-gray-200 bg-white text-sm text-left">
                      {request.courseId ? (
                        <p className="text-gray-900 whitespace-no-wrap flex">
                          is interested in enrolling in the course
                          <p
                            onClick={() => {
                              navigate(`/admin/course/${request.courseId}`);
                            }}
                            className="font-semibold px-2 hover:underline hover:cursor-pointer"
                          >
                            {"("}
                            {request.courseTitle}
                            {")"}
                          </p>
                        </p>
                      ) : (
                        <p className="text-gray-900 whitespace-no-wrap flex ">
                          want to re attempt the Quiz
                          <p
                            onClick={() => {
                              navigate(
                                `/admin/quizzes/viewQuiz/${request.quizId}`
                              );
                            }}
                            className="font-semibold px-2 hover:underline hover:cursor-pointer"
                          >
                            {"("}
                            {request.quizTitle}
                            {")"}
                          </p>
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-3 w-1/4 border-b border-gray-200 bg-white text-sm text-center">
                      <div className="flex justify-center">
                        <button
                          disabled={isLoading || accepting}
                          onClick={() => {
                            console.log(!request.quizId);
                            if (!request.quizId) {
                              console.log("course");
                              assignCourse(
                                {
                                  empId: request.empId,
                                  courseId: request.courseId,
                                },
                                { onSuccess: () => removeRequest(request._id) }
                              );
                            } else {
                              console.log("quiz");
                              quizRequest(
                                {
                                  empId: request.empId,
                                  quizId: request.quizId,
                                },
                                { onSuccess: () => removeRequest(request._id) }
                              );
                            }
                          }}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 mr-2 rounded-full"
                        >
                          <span className="text-xl">
                            <IoMdDoneAll />
                          </span>
                          <span className="font-semibold text-md">Accept</span>
                        </button>
                        <button
                          disabled={deletingRequest}
                          onClick={() => {
                            removeRequest(request._id, {
                              onSuccess: () => {
                                toast.success("Request declined Successfully");
                              },
                            });
                          }}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full"
                        >
                          <span className="text-xl">
                            <RxCross2 />
                          </span>
                          <span className="font-semibold text-md">Decline</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
