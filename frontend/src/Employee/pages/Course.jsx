/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import Module from "../component/courses/Module";
import { useModuleByCourseId } from "../../Admin/components/courses/useModuleByCourseId";
import Spinner from "../../Common/Ui/Spinner";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useCourseByCourseId } from "../../Admin/components/courses/useCourseByCourseId";
import { useVideoByCourseId } from "../../Admin/components/courses/useVideoByCourseId";
import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import { useQuizByCourseId } from "../../Admin/components/quiz/useQuizByCourseId";
import { FaPlayCircle } from "react-icons/fa";
import { useEffect } from "react";
import { updateEmployee } from "../../Admin/service/employee";
import { updateCourseStatus } from "../../Admin/service/courses";

export default function Course() {
  const { courseId } = useParams();
  const [play, setPlay] = useState(false);
  const [videoLink, setVideoLink] = useState(null);
  const [percent, setPercent] = useState();
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading: loadingEmployee, employe_info } = useEmployeeInfo(token);
  const { isLoading: loadingModule, modules } = useModuleByCourseId(courseId);
  const { isLoading: loadingCourse, course } = useCourseByCourseId(courseId);
  const { isLoading, videos: ModuleVidos } = useVideoByCourseId(courseId);
  const { isLoading: loadingQuizs, quizs } = useQuizByCourseId(courseId);

  // Ensure hooks are called before any early returns
  const sortedmodules = modules?.sort((a, b) => a.moduleNo - b.moduleNo) || [];

  const allVideos = sortedmodules.flatMap((module) => module.video);

  const sortedVideos =
    ModuleVidos?.sort(
      (a, b) => allVideos.indexOf(a._id) - allVideos.indexOf(b._id)
    ).map((video, index) => ({
      ...video,
      sequenceNo: index + 1, // Add sequenceNo field based on the sorted index
    })) || [];

  // Function to get the sequence number of the first unwatched video
  function getSequenceNo(videos, userId) {
    for (let video of videos) {
      if (!video.watchedBy.includes(userId)) {
        return video.sequenceNo; // Return the correct sequence number
      }
    }
    return null; // If all videos are watched, return null
  }

  useEffect(() => {
    if (
      videoLink === null &&
      sortedVideos.length > 0 &&
      employe_info?.empId &&
      play
    ) {
      const sequenceNo = getSequenceNo(sortedVideos, employe_info?.empId);
      setVideoLink(sequenceNo);
    }
  }, [sortedVideos, employe_info, videoLink, play]);

  useEffect(() => {
    updateEmployee({ empId: employe_info?.empId, currentCourse: courseId });
    if (percent) {
      updateCourseStatus({
        userId: employe_info?.empId,
        courseId: courseId,
        status: percent,
      });
    }
  }, [
    courseId,
    employe_info?.empId,
    percent,
    updateCourseStatus,
    updateEmployee,
  ]);

  const countEmpIdOccurrences = (data, empId) => {
    return data?.reduce((count, item) => {
      return count + item.passedBy.filter((id) => id === empId).length;
    }, 0);
  };

  const watchedCount = ModuleVidos?.filter((item) =>
    item.watchedBy.includes(employe_info?.empId)
  ).length;

  useEffect(() => {
    const percentage = Math.round(
      setPercent(
        ((watchedCount + countEmpIdOccurrences(quizs, employe_info?.empId)) /
          (ModuleVidos?.length + quizs?.length)) *
          100
      )
    );
  });

  // Early return after hooks are called
  if (
    loadingModule ||
    loadingCourse ||
    isLoading ||
    loadingEmployee ||
    loadingQuizs
  ) {
    return <Spinner />;
  }

  // const length = ModuleVidos.length;

  // const count = countEmpIdOccurrences(quizs, employe_info.empId);

  return (
    <div className="w-full md:flex p-4">
      <div className="w-full md:w-9/12 overflow-y-auto pb-3 md:pb-20">
        {videoLink !== null && videoLink <= sortedVideos.length ? (
          <VideoPlayer
            videoLink={sortedVideos[videoLink - 1]?.videoLink}
            videoId={sortedVideos[videoLink - 1]?._id}
            courseId={courseId}
            percentage={percent}
            setVideoLink={setVideoLink}
          />
        ) : (
          <div className="relative w-full">
            {/* Course Thumbnail */}
            <img
              src={course?.thumbnail}
              className="w-full rounded opacity-70"
              alt="Course Thumbnail"
            />

            {/* Play Button */}
            <button
              onClick={() => setPlay(() => true)}
              className="absolute  inset-0 flex items-center justify-center text-8xl text-gray-800"
            >
              <FaPlayCircle />
            </button>
          </div>
        )}

        {videoLink !== null && (
          <div className="w-full shadow rounded-lg text-testColor1 bg-secondary2 p-4 mt-8">
            <h3 className="text-md pb-2 font-bold">Video Description</h3>
            {sortedVideos[videoLink - 1]?.videoDescription}
          </div>
        )}

        <div className="w-full shadow rounded-lg  text-testColor1 bg-secondary2 p-4 mt-4">
          <h3 className="text-md pb-2 font-bold">Course Description</h3>
          {course.courseDescription}
        </div>
      </div>

      <div className="w-full md:w-3/12 h-full pl-2 pb-16">
        <div className="bg-slate-100 h-full shadow-lg  border-t-2 text-white border-testColor1 text-opacity-80 overflow-y-auto">
          {sortedmodules.map((module) => (
            <Module
              key={module._id}
              moduleId={module._id}
              id={courseId}
              videos={module.video}
              moduleName={module.moduleName}
              setVideoLink={setVideoLink}
              empId={employe_info.empId}
              allVideos={sortedVideos}
              videoLink={videoLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
