import React, { useState } from "react";
// Adjust path as necessary
import { useForm } from "react-hook-form";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import imageCompression from "browser-image-compression";
import { MdAddAPhoto } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useUploadCertificate } from "../components/settings/useUploadCertificate";
import {  useNavigate } from "react-router-dom";
import SpinnerMini from "../../Common/Ui/SpinnerMini";

export default function CertificateBackground() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [cropData, setCropData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const { uploadCertificate, isLoading } = useUploadCertificate();

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
    if (cropper) {
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

  const onSubmit = () => {
    if (!imageUpload) return;

    uploadCertificate(imageUpload, {
      onSuccess: () => {
        navigate("/admin/settings"); //
      },
    });
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-200 pb-14 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Set Certificate Background
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="thumbnail"
          >
            Upload Image
          </label>
          {!image ? (
            <label htmlFor="image" className="relative cursor-pointer">
              <span className="flex justify-center w-full bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-300 focus:outline-none focus:border-blue-500 focus:bg-blue-100">
                <div className="flex justify-center items-center h-[30vh]">
                  <MdAddAPhoto className="text-8xl" />
                </div>
              </span>
              <input
                type="file"
                id="image"
                accept="image/*"
                disabled={!!image}
                className="absolute top-0 left-0 w-full h-full opacity-0"
                onChange={handleImageChange}
              />
            </label>
          ) : !cropData ? (
            <div>
              <Cropper
                style={{ height: 400, width: "100%" }}
                // aspectRatio={16 / 9}
                src={image}
                viewMode={1}
                guides={false}
                scalable={true}
                cropBoxResizable={true}
                onInitialized={(instance) => setCropper(instance)}
              />
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
              <img src={cropData} className="w-full" alt="Cropped" />
            </div>
          )}
          {(!image && !cropData) || (image && cropData) ? (
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                {isLoading ? <SpinnerMini /> : "Add Background"}
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
