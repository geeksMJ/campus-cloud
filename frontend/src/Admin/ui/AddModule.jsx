/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import FormError from "../../Common/Ui/FormError";
import { MdFileUpload } from "react-icons/md";
import AddVideos from "./AddVideos";

export default function AddModule({ moduleNo, setModuleData, setNoOfModule }) {
  const [showVideos, setShowVideos] = useState(true);
  const [noOfVideos, setNoOfVideos] = useState(0);
  const [videoNoList, setVideoNoList] = useState([]);
  const [videoArray, setVideoArray] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function addVideo() {
    setNoOfVideos((prevValue) => prevValue + 1);
    setVideoNoList((prevVideoNoList) => [...prevVideoNoList, noOfVideos]);
    // const filteredArray = videoArray.filter((video) => video !== undefined);
    // const arrayLength = filteredArray.length;
    // if (arrayLength === noOfVideos) {
    //   setNoOfVideos((prevValue) => prevValue + 1);
    //   setVideoNoList((prevVideoNoList) => [...prevVideoNoList, noOfVideos]);
    // } else {
    //   toast.error(`
    //     Upload Video No ${arrayLength + 1} In Module No ${moduleNo} First`);
    // }
  }

  function removeVideo() {
    setNoOfVideos((prevValue) => prevValue - 1);
    setVideoNoList((list) => [...list.slice(0, -1)]);
    // const filteredArray = videoArray.filter((video) => video !== undefined);
    // const arrayLength = filteredArray.length;
    // if (noOfVideos === arrayLength) {
    //   toast.error(
    //     `Video No ${arrayLength} In Module No ${moduleNo} Already Uploaded `
    //   );
    // } else {
    //   setNoOfVideos((prevValue) => prevValue - 1);
    //   setVideoNoList((list) => [...list.slice(0, -1)]);
    // }
  }

  function onSubmit(data) {
    const filteredVideoArray = videoArray;
    if (noOfVideos === 0) {
      toast.error("Add Atleast One Video");
    } else {
      // Remove the first element from the filtered array
      const updatedVideoArray = filteredVideoArray.slice(1);
      console.log(updatedVideoArray);

      setModuleData((prevArray) => [
        ...prevArray,
        {
          moduleName: data.title,
          moduleNo: moduleNo,
          video: updatedVideoArray,
        },
      ]);

      reset();
      setNoOfVideos(0);
      setVideoNoList([]);
      setVideoArray([]);
      setNoOfModule((value) => value + 1);
    }
  }

  return (
    <div className="w-full shadow-lg p-4 rounded-lg bg-gray-100 border">
      <div className="flex w-full justify-between pb-4">
        <h2 className="text-xl font-extrabold bold mb-1 px-1 ">
          Module {moduleNo}
        </h2>
        <div>
          <div className="flex">
            <div>
              <button
                className="bg-red-600 text-sm font-semibold text-white py-1 px-2 mx-1 rounded-md cursor-pointer flex justify-center items-center"
                onClick={() => removeVideo()}
                // disabled={moduleUploaded}
              >
                <IoIosRemoveCircleOutline />
                Remove Video
              </button>
            </div>
            <div>
              <button
                className="bg-blue-600 text-sm font-semibold text-white py-1 px-2 mx-1 rounded-md cursor-pointer flex justify-center items-center"
                onClick={() => addVideo()}
                // disabled={moduleUploaded}
              >
                <IoIosAddCircleOutline />
                Add Video
              </button>
            </div>
            <div>
              <button
                className="bg-gray-500 text-lg font-semibold text-white py-1 px-2 mx-1 rounded-md cursor-pointer flex justify-center items-center"
                onClick={() => setShowVideos((value) => !value)}
              >
                {showVideos ? <FaAngleUp /> : <FaAngleDown />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="w-10/12 px-1">
            <div className="">
              {/* <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label> */}
              <input
                type="text"
                id="title"
                placeholder="Video Title"
                // disabled={moduleUploaded}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("title", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>
          <div className="w-2/12 px-1 flex justify-center items-center">
            <button
              className={`${"bg-green-600"} text-md font-semibold text-white py-1 px-2 rounded-md cursor-pointer`}
              onClick={handleSubmit(onSubmit)}
              // disabled={moduleUploaded}
            >
              <div className="flex justify-center items-center">
                <MdFileUpload />
                Upload Module
              </div>
            </button>
          </div>
        </div>
        <div>{errors.title && <FormError error={errors.title.message} />}</div>
      </form>
      <div className="py-2">
        {videoNoList.map((videoNo, index) => (
          <div key={index} className="mt-2">
            <AddVideos
              videosNo={videoNo + 1}
              videoArray={videoArray}
              setVideoArray={setVideoArray}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
