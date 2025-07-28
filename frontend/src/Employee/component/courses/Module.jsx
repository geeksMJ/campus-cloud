/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Dropdown.js
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { MdKeyboardArrowUp } from "react-icons/md";
import Video from "./Video";
import Spinner from "../../../Common/Ui/Spinner";
import { useQuizesByModuleId } from "../../../Admin/components/quiz/useQuizesByModuleId";
import { TbBulb } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSendRequestsForCourse } from "../../../Admin/components/requests/useSendRequestsForCourse";
import { useEmployeeInfo } from "../employee_info/useEmployeeInfo";
import { useAllRequest } from "../../../Admin/components/requests/useAllRequests";

const Module = ({
  videos,
  moduleId,
  moduleName,
  setVideoLink,
  empId,
  allVideos,
  videoLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { isLoading, quiz } = useQuizesByModuleId(moduleId);
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployee, employe_info } = useEmployeeInfo(token);
  const { sendRequestsForCourse, isLoading: sendingRequest } =
    useSendRequestsForCourse();
  const { isLoading: loadingRequests, allRequest } = useAllRequest();

  useEffect(() => {
    const video = allVideos.find((video) => video.sequenceNo === videoLink);
    const open = videos.includes(video?._id);
    setIsOpen(open);
  }, [allVideos, moduleName, videoLink, videos]);

  if (isLoading || loadingEmployee || loadingRequests) return <Spinner />;

  function checkQuizAndEmpId(quizId, empId) {
    return allRequest.some(
      (item) => item.quizId === quizId && item.empId === empId
    );
  }

  const quizIdToCheck = quiz[0]?._id;
  const empIdToCheck = employe_info.empId;

  const result = checkQuizAndEmpId(quizIdToCheck, empIdToCheck);

  let attempted;
  let passed;

  console.log("ye le quiz", quiz);

  quiz.some((item) => {
    attempted = item.attemptedBy.includes(empId);
    passed = item.passedBy.includes(empId);
  });

  console.log("ye le", empId);

  return (
    <div className="w-full bg-secondary2">
      <button
        onClick={() => toggleDropdown()}
        className="w-full  border-b-2 border-testColor1"
      >
        <div className=" flex justify-center items-center py-3">
          <span className="text-lg font-bold">{moduleName} </span>
          <span className="text-3xl font-extrabold">
            {isOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
          </span>
        </div>
      </button>

      {isOpen && (
        <>
          {videos.map((id) => (
            <Video
              key={id}
              id={id}
              videoLink={videoLink}
              setVideoLink={setVideoLink}
              // setVideoId={setVideoId}
              allVideos={allVideos}
            />
          ))}
          {quiz.length !== 0 && (
            <div
              className={`w-full p-2 flex items-center bg-secondary3 text-black border-b-2 cursor-pointer ${
                attempted && (passed ? "bg-green-300" : "bg-red-300")
              }`}
              onClick={() => {
                if (!attempted) navigate(`/employee/quiz/${quiz[0]?._id}`);
              }}
            >
              <span className="text-2xl">
                <TbBulb />
              </span>
              <p className="text-md font-semibold px-2">
                {quiz[0]?.title}
                {attempted && (passed ? "(passed)" : " (failed)")}
              </p>
              {attempted &&
                (passed ? (
                  ""
                ) : (
                  <button
                    disabled={sendingRequest || result}
                    onClick={() => {
                      sendRequestsForCourse({
                        quizId: quiz[0]?._id,
                        quizTitle: quiz[0]?.title,
                        empId: employe_info.empId,
                        employeeName: employe_info.employeeName,
                      });
                    }}
                    className={`font-bold ${
                      result
                        ? "bg-gray-500 text-slate-800"
                        : "bg-green-500 text-slate-200"
                    }  rounded border px-2 py-1`}
                  >
                    Retry
                  </button>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Module;
