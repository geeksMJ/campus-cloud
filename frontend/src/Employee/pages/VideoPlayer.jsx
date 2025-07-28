/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useVideoWatched } from "../../Admin/components/courses/useVideoWatched";
import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import SpinnerMini from "../../Common/Ui/SpinnerMini";
import { useUpdateCourseStatus } from "../../Admin/components/courses/useUpdateCourseStatus";
import { useUpdateEmployee } from "../../Admin/components/settings/useUpdateEmployee";

const VideoPlayer = ({
  videoLink,
  videoId,
  courseId,
  percentage,
  setVideoLink,
}) => {
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployee, employe_info } = useEmployeeInfo(token);
  const { updateEmployee, isLoading: updateEmployeeLoading } =
    useUpdateEmployee();
  const [duration, setDuration] = useState(0);

  const { addVideoWatched, isLoading } = useVideoWatched(videoId, courseId);
  const { updateCourseStatus, isLoading: updatingStatus } =
    useUpdateCourseStatus();

  const handleProgress = ({ playedSeconds }) => {
    const remainingTime = duration - playedSeconds;
    if (remainingTime <= 1) {
      runFunction();
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  useEffect(() => {
    updateEmployee({ empId: employe_info.empId, currentCourse: courseId });
    updateCourseStatus({
      userId: employe_info.empId,
      courseId: courseId,
      status: percentage,
    });
  }, [
    courseId,
    employe_info.empId,
    percentage,
    updateCourseStatus,
    updateEmployee,
  ]);

  const runFunction = () => {
    addVideoWatched({ videoId, empId: employe_info.empId });
    setVideoLink((value) => value + 1);
  };

  if (isLoading || loadingEmployee) return <SpinnerMini />;

  return (
    <div
      className="video-wrapper h-[72vh] bg-black flex justify-center items-center w-full rounded"
      onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
    >
      <ReactPlayer
        key={videoLink} // Force re-render on videoLink change
        url={videoLink}
        controls
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
        s
        playing={true} // Enable autoplay
        width="100%"
        height="auto"
        onError={(e) => console.error("Error loading video", e)}
        onProgress={handleProgress}
        onDuration={handleDuration} // Capture video duration
      />
    </div>
  );
};

export default VideoPlayer;
