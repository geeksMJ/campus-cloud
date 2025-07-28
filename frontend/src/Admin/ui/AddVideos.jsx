/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormError from "../../Common/Ui/FormError";
import { MdFileUpload } from "react-icons/md";
import { useAddVideo } from "../components/courses/useAddVideo";
import SpinnerMini from "../../Common/Ui/SpinnerMini";
import toast from "react-hot-toast";

export default function AddVideos({ videosNo, setVideoArray }) {
  const [videoStates, setVideoStates] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const { addVideo, isLoading, VideoData } = useAddVideo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validVideoTypes = ["video/mp4", "video/ogg", "video/webm"];

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("videoTitle", data.title);
    formData.append("videoDescription", data.description);
    formData.append("videoNo", videosNo);
    formData.append("videoLink", videoStates[`selectedFile${videosNo}`]);

    addVideo(formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
      onSuccess: () => {
        setVideoStates((prevState) => ({
          ...prevState,
          [`uploaded${videosNo}`]: true,
        }));
        setUploadProgress(0);
        toast.success("Video uploaded successfully!");
        reset();
      },
    });
  }

  useEffect(() => {
    if (!VideoData) return;

    setVideoArray((prevArray) => {
      if (prevArray.includes(VideoData._id)) {
        return prevArray;
      }
      return [...prevArray, VideoData._id];
    });
  }, [VideoData, setVideoArray]);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!validVideoTypes.includes(file.type)) {
      toast.error("Please select a valid video file!");
      return;
    }

    setVideoStates((prevState) => ({
      ...prevState,
      [`selectedFile${videosNo}`]: file,
    }));
  }

  return (
    <div className="w-full shadow-lg px-4 py-1 rounded-lg bg-gray-100 border">
      <h2 className="w-full text-lg font-bold mb-1 px-1">Video {videosNo}</h2>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="w-3/12 px-1">
            {/* Title input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                disabled={isLoading || videoStates[`uploaded${videosNo}`]}
                placeholder="Video Title"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  isLoading ||
                  (videoStates[`uploaded${videosNo}`] && "cursor-not-allowed")
                }`}
                {...register("title", {
                  required: "This field is required",
                })}
              />
              {errors.title && <FormError error={errors.title.message} />}
            </div>
          </div>
          <div className="w-5/12 px-1">
            {/* Description input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Course Description"
                disabled={isLoading || videoStates[`uploaded${videosNo}`]}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  isLoading ||
                  (videoStates[`uploaded${videosNo}`] && "cursor-not-allowed")
                }`}
                {...register("description", {
                  required: "This field is required",
                })}
              />
              {errors.description && (
                <FormError error={errors.description.message} />
              )}
            </div>
          </div>
          <div className="w-3/12 px-1">
            {/* Video upload */}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Add Video
            </label>
            <label htmlFor={`video${videosNo}`} className="relative">
              {!videoStates[`selectedFile${videosNo}`] ? (
                <div className="w-full flex justify-center items-center bg-blue-600 text-white font-semibold py-1 rounded-md cursor-pointer">
                  Select Video
                </div>
              ) : (
                <div className="w-full flex justify-center items-center bg-gray-300 text-white font-semibold py-1 rounded-md cursor-not-allowed">
                  Video Selected
                </div>
              )}
            </label>
            <input
              type="file"
              className="hidden"
              disabled={isLoading || videoStates[`uploaded${videosNo}`]}
              id={`video${videosNo}`}
              {...register("video", {
                required: "No Video Selected",
              })}
              onChange={handleFileChange}
            />
            {errors.video && <FormError error={errors.video.message} />}
          </div>
          <div className="w-1/12 px-1 flex justify-center items-center">
            {/* Upload button */}
            <button
              type="submit"
              disabled={isLoading || videoStates[`uploaded${videosNo}`]}
              className={`${
                videoStates[`uploaded${videosNo}`]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600"
              } text-md font-semibold text-white py-1 px-2 rounded-md`}
            >
              {isLoading ? (
                <SpinnerMini />
              ) : videoStates[`uploaded${videosNo}`] ? (
                "Uploaded"
              ) : (
                <div className="flex justify-center items-center">
                  <MdFileUpload />
                  Upload
                </div>
              )}
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </form>
    </div>
  );
}
