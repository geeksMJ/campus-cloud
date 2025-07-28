/* eslint-disable no-unused-vars */
import React from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import FormError from "../../Common/Ui/FormError";
import { useAdminSignup } from "../components/settings/useAdminSignup";
import SpinnerMini from "../../Common/Ui/SpinnerMini";
import BackButton from "../../Common/Ui/BackButton";

export default function AdminSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { adminSignup, isLoading } = useAdminSignup();

  function onSubmit(data) {
    if (data.password !== data.confirmPassword) {
      toast.error("Password Does Not Match");
      reset();
    } else {
      adminSignup(
        {
          adminName: data.name,
          adminEmail: data.email,
          adminPassword: data.password,
          adminConfirmPassword: data.confirmPassword,
        },
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
  }

  return (
    <>
      <BackButton />
      <div className="h-full w-full flex items-center justify-center bg-gray-200 pb-20">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Add new admin</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                disabled={isLoading}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("name", {
                  required: "This field is required",
                })}
              />
              {errors.name && <FormError error={errors.name.message} />}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter Email"
                disabled={isLoading}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <FormError error={errors.email.message} />}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                disabled={isLoading}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "min 8 characters",
                  },
                })}
              />
              {errors.password && <FormError error={errors.password.message} />}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter Confirm Password"
                disabled={isLoading}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("confirmPassword", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "min 8 characters",
                  },
                })}
              />
              {errors.password && <FormError error={errors.password.message} />}
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? <SpinnerMini /> : "Add Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
