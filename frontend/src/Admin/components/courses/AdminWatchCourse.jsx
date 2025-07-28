/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useModuleByCourseId } from "./useModuleByCourseId";
import { useCourseByCourseId } from "./useCourseByCourseId";
import { useVideoByCourseId } from "./useVideoByCourseId";
import Spinner from "../../../Common/Ui/Spinner";
import AdminVideoPlayer from "./AdminVideoPlayer";
import AdminModule from "./AdminModule";

export default function AdminWatchCourse() {
  const { courseId } = useParams();
  const [videoLink, setVideoLink] = useState(null);

  const { isLoading: loadingModule, modules } = useModuleByCourseId(courseId);
  const { isLoading: loadingCourse, course } = useCourseByCourseId(courseId);
  const { isLoading, videos: ModuleVidos } = useVideoByCourseId(courseId);

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

  if (loadingModule || loadingCourse || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full md:flex p-4">
      <div className="w-full md:w-9/12 overflow-y-auto pb-3 md:pb-20">
        {videoLink !== null ? (
          <AdminVideoPlayer
            videoLink={sortedVideos[videoLink - 1]?.videoLink}
            videoId={sortedVideos[videoLink - 1]?._id}
            courseId={courseId}
            setVideoLink={setVideoLink}
          />
        ) : (
          <img src={course?.thumbnail} className="w-full rounded" />
        )}

        {videoLink !== null && (
          <div className="w-full shadow rounded-lg border p-4 mt-8">
            <h3 className="text-md pb-2 font-bold">Video Description</h3>
            {sortedVideos[videoLink]?.videoDescription}
          </div>
        )}

        <div className="w-full shadow rounded-lg border p-4 mt-4">
          <h3 className="text-md pb-2 font-bold">Course Description</h3>
          {course.courseDescription}
        </div>
      </div>

      <div className="w-full md:w-3/12 h-full px-2 pb-16">
        <div className="bg-slate-100 h-full shadow-lg shadow-stone-400 rounded-md overflow-y-auto">
          {sortedmodules.map((module) => (
            <AdminModule
              key={module._id}
              moduleId={module._id}
              id={courseId}
              videos={module.video}
              moduleName={module.moduleName}
              setVideoLink={setVideoLink}
              allVideos={sortedVideos}
              videoLink={videoLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
