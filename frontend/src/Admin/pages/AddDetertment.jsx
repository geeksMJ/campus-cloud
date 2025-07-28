/* eslint-disable no-unused-vars */
import React from "react";

import { useForm } from "react-hook-form";
import FormError from "../../Common/Ui/FormError";
import BackButton from "../../Common/Ui/BackButton";
import { useAddDepartment } from "../components/settings/useAddDepartment";
import SpinnerMini from "../../Common/Ui/SpinnerMini";

export default function AddDetertment() {
  const { addDepartment, isLoading } = useAddDepartment();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    addDepartment(
      { departmentName: data.department },
      {
        onSuccess: () => {
          reset();
        },
        onError: () => {
          reset();
        },
      }
    );
  }

  return (
    <>
      <BackButton />
      <div className="h-full w-full flex items-center justify-center bg-gray-200 pb-20 overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add New Department
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empid"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                placeholder="Enter Department"
                disabled={isLoading}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("department", {
                  required: "This field is required",
                })}
              />
              {errors.department && (
                <FormError error={errors.department.message} />
              )}
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? <SpinnerMini /> : "Add Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
