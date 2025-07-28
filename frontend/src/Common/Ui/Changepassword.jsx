import React from "react";
import FormError from "./FormError";

import SpinnerMini from "./SpinnerMini";

export default function Changepassword({ register, isLoading, errors }) {
  return (
    <div>
      <div className="mb-4">
        <label
          className="block text-testColor1 text-sm font-bold mb-2"
          htmlFor="currentPassword"
        >
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          placeholder="Enter Current Password"
          disabled={isLoading}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("currentPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "min 8 characters",
            },
          })}
        />
        {errors.currentPassword && (
          <FormError error={errors.currentPassword.message} />
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-testColor1 text-sm font-bold mb-2"
          htmlFor="newPassword"
        >
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          placeholder="Enter New Password"
          disabled={isLoading}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "min 8 characters",
            },
          })}
        />
        {errors.newPassword && <FormError error={errors.newPassword.message} />}
      </div>
      <div className="mb-6">
        <label
          className="block text-testColor1 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm New Password
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
        {errors.confirmPassword && (
          <FormError error={errors.confirmPassword.message} />
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-primary w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : "Change Password"}
        </button>
      </div>
    </div>
  );
}
