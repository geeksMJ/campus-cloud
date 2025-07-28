/* eslint-disable react/prop-types */
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { useEmployeeInfo } from "../employee_info/useEmployeeInfo";
import { useState } from "react";

export default function Video({
  id,
  // setVideoDiscription,
  setVideoLink,
  videoLink,
  // setVideoId,
  allVideos,
}) {
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployee, employe_info } = useEmployeeInfo(token);

  if (loadingEmployee) return null;
  const video = allVideos.find((video) => video._id === id);

  return (
    <div
      className={`w-full p-2 flex items-center ${
        videoLink === video.sequenceNo ? "bg-blue-300" : ""
      } border-b-2 border-testColor1 text-black bg-secondary3 cursor-pointer`}
      onClick={() => {
        // setVideoDiscription(video.videoDescription);
        setVideoLink(video.sequenceNo);
      }}
    >
      <span className="text-2xl font-semibold">
        {video?.watchedBy.includes(employe_info.empId) ? (
          <MdOutlineCheckBox />
        ) : (
          <MdOutlineCheckBoxOutlineBlank />
        )}
      </span>
      <span className="text-md font-normal px-2">{video.videoTitle}</span>
    </div>
  );
}
