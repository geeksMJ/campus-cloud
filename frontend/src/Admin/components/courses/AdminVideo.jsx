/* eslint-disable react/prop-types */
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export default function AdminVideo({
  id,

  setVideoLink,
  videoLink,

  allVideos,
}) {
  const video = allVideos.find((video) => video._id === id);

  return (
    <div
      className={`w-full p-2 flex items-center ${
        videoLink === video.sequenceNo ? "bg-blue-300" : ""
      } border-b-2 cursor-pointer`}
      onClick={() => {
        // setVideoDiscription(video.videoDescription);
        setVideoLink(video.sequenceNo);
      }}
    >
      <span className="text-2xl font-semibold">
        <MdOutlineCheckBoxOutlineBlank />
      </span>
      <span className="text-md font-normal px-2">{video.videoTitle}</span>
    </div>
  );
}
