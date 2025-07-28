/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuizesByModuleId } from "../quiz/useQuizesByModuleId";
import Spinner from "../../../Common/Ui/Spinner";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import AdminVideo from "./AdminVideo";
import { useNavigate } from "react-router-dom";

const AdminModule = ({
  videos,
  moduleId,
  moduleName,
  setVideoLink,
  allVideos,
  videoLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { isLoading, quiz } = useQuizesByModuleId(moduleId);
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  console.log(quiz);

  return (
    <div className="w-full">
      <button onClick={() => toggleDropdown()} className="w-full  border-b-2">
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
            <AdminVideo
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
              className={`w-full p-2 flex items-center border-b-2 cursor-pointer }`}
              onClick={() => {
                navigate(`/admin/quizzes/viewQuiz/${quiz[0]?._id}`);
              }}
            >
              {quiz[0]?.title}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminModule;
