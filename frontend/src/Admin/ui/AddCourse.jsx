/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useAddCourse } from "../components/courses/useAddCourse";
import FormError from "../../Common/Ui/FormError";
import SpinnerMini from "../../Common/Ui/SpinnerMini";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { MdAddAPhoto } from "react-icons/md";
import { useForm } from "react-hook-form";
import Dropdown from "./DropDown";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import FloatContainer from "../../Common/Ui/FloatContainer";
import { IoIosArrowDropright } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

export default function AddCourse({ setCourseData }) {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [cropData, setCropData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [selectDepartment, setSelectDepartment] = useState(false);
  const { addCourse, isLoading: addingCourse, CourseData } = useAddCourse();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departmentError, setDepartmentError] = useState(null);

  console.log(selectedDepartments);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob(async (blob) => {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(blob, options);
          setImageUpload(compressedFile);
          setCropData(URL.createObjectURL(blob));
        } catch (error) {
          console.error("Error compressing image:", error);
          toast.error("Failed to compress image.");
        }
      });
    }
  };

  const onSubmit = (data) => {
    if (!imageUpload) return;
    if (!selectedDepartment) {
      setDepartmentError("Department is required");
      return;
    }

    // const formData = new FormData();
    // formData.append("courseTitle", data.title);
    // formData.append("courseDescription", data.description);
    // formData.append("courseDepartment", selectedDepartment);
    // formData.append("thumbnail", imageUpload);

    setCourseData({
      courseTitle: data.title,
      courseDescription: data.description,
      courseDepartment: selectedDepartments,
      thumbnail: imageUpload,
    });
    
  };

  const handleSelectDepartment = (option) => {
    setSelectedDepartment(option);

    // Add selected option to the array only if it doesn't exist
    if (!selectedDepartments.includes(option)) {
      setSelectedDepartments((prevDepartments) => [...prevDepartments, option]);
    }
  };

  // Function to handle when the "Done" button is clicked
  const handleDone = () => {
    if (selectedDepartments.length === 0) return null;
    setSelectDepartment(false);
    // setSelectedDepartments([]);
  };

  const removeDepartment = (indexToRemove) => {
    setSelectedDepartments((prevDepartments) =>
      prevDepartments.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-200 pb-14 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="thumbnail"
          >
            Thumbnail
          </label>
          {!image ? (
            <label htmlFor="image" className="relative cursor-pointer">
              <span className="flex justify-center w-full bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-300 focus:outline-none focus:border-blue-500 focus:bg-blue-100 overflow-y-scroll">
                <div className="flex justify-center items-center h-[30vh]">
                  <MdAddAPhoto className="text-8xl" />
                </div>
              </span>
              <input
                type="file"
                id="image"
                accept="image/*"
                disabled={!!image}
                className="absolute top-0 left-0 w-full h-full opacity-0 "
                onChange={handleImageChange}
              />
            </label>
          ) : !cropData ? (
            <div>
              <div className="flex flex-col items-center">
                <Cropper
                  style={{ height: 400, width: "100%" }}
                  aspectRatio={16 / 9}
                  src={image}
                  viewMode={1}
                  guides={false}
                  scalable={true}
                  cropBoxResizable={true}
                  onInitialized={(instance) => setCropper(instance)}
                />
              </div>
              <div className="flex pt-3">
                <button
                  type="button"
                  onClick={getCropData}
                  className="bg-blue-600 p-1 rounded-md text-md mr-1 font-semibold text-white w-1/2"
                >
                  Crop
                </button>
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="bg-gray-600 p-1 rounded-md text-md ml-1 font-semibold text-white w-1/2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <img src={cropData} alt="Cropped" />
            </div>
          )}
          {((!image && !cropData) || (image && cropData)) && (
            <>
              <div className="mb-4 mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Course Title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("title", {
                    required: "This field is required",
                  })}
                />
                {errors.title && <FormError error={errors.title.message} />}
              </div>
              <div className="mb-4 mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Department
                </label>
                {selectedDepartments.map((department, index) => (
                  <div
                    key={index}
                    className="py-1 flex font-medium text-lg items-center"
                  >
                    <span className="pr-2 font-bold">
                      <IoIosArrowDropright />
                    </span>

                    {department}
                  </div>
                ))}
                <div
                  onClick={() => setSelectDepartment(true)}
                  className="bg-blue-600 w-full text-center hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Departments
                </div>
                {departmentError && <FormError error={departmentError} />}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Course Description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("description", {
                    required: "This field is required",
                  })}
                />
                {errors.description && (
                  <FormError error={errors.description.message} />
                )}
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Course{" "}
                </button>
              </div>
            </>
          )}
        </form>
        {selectDepartment && (
          <FloatContainer
            onClose={() => {
              setSelectDepartment(false);
            }}
          >
            <div className="bg-slate-100 p-4 rounded">
              <div className="pb-4 font-bold text-2xl text-center">
                Select Department
              </div>
              <Dropdown
                selectedOption={selectDepartment}
                uploading={true}
                setSelectedOption={handleSelectDepartment} // use the handler function
              />
              {selectedDepartments.length > 0 && (
                <>
                  <div className="py-4 font-semibold text-xl text-center">
                    Selected Departments
                  </div>
                  <div className="">
                    {selectedDepartments.map((department, index) => (
                      <div
                        key={index}
                        className="py-1 flex font-medium text-lg items-center"
                      >
                        <span className="pr-2 font-bold">
                          <IoIosArrowDropright />
                        </span>

                        {department}
                        <button
                          className="ml-auto text-red-500"
                          onClick={() => removeDepartment(index)} // Remove department on click
                        >
                          <RxCrossCircled size={24} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleDone} // trigger the done action
                  className="font-semibold w-full text-white py-1 px-3 bg-green-600 rounded mx-2"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    setSelectDepartment(false);
                    setSelectedDepartments([]);
                  }} // Reset selection
                  className="font-semibold w-full text-white py-1 px-3 bg-gray-600 rounded mx-2"
                >
                  Close
                </button>
              </div>
            </div>
          </FloatContainer>
        )}
      </div>
    </div>
  );
}
