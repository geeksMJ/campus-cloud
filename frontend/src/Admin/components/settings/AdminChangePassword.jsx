import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useChangePassword } from "./useChangePassword";
import Changepassword from "../../../Common/Ui/Changepassword";

export default function AdminChangePassword() {
  const adminEmail = localStorage.getItem("adminEmail");
  const { changePassword, isLoading } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    changePassword(
      {
        adminEmail: adminEmail,
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
        }
      }
    );
  }

  return (
    <div className="h-full w-full flex items-center p-2 justify-center bg-gray-200 pb-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Changepassword
            register={register}
            isLoading={isLoading}
            errors={errors}
          />
        </form>
      </div>
    </div>
  );
}
