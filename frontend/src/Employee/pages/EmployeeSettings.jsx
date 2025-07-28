/* eslint-disable no-unused-vars */
import SpinnerMini from "../../Common/Ui/SpinnerMini";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import { Logout } from "../../Common/service/auth";
import { useChangePassword } from "../component/auth/useChangePassword";
import FormError from "../../Common/Ui/FormError";
import Changepassword from "../../Common/Ui/Changepassword";

export default function EmployeeSettings() {
  const [token] = useState(localStorage.getItem("token"));
  const { employe_info } = useEmployeeInfo(token);
  const { changePassword, isLoading } = useChangePassword();
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const flashUpStyle = {
    opacity: isRendered ? 1 : 0,
    transform: isRendered
      ? "translateY(0) scale(1)"
      : "translateY(-500px) scale(1)",
    transition: " transform .5s ease-out",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    if (data.newPassword != data.confirmPassword) {
      toast.error("Password does not match!");
    } else {
      if (
        data.newPassword === data.confirmPassword &&
        employe_info.password === data.currentPassword
      ) {
        changePassword(
          {
            empId: employe_info.empId,
            oldPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
          {
            onSuccess: () => {
              navigate("/login");
              Logout();
            },
          }
        );
      } else {
        toast.error("Incorrect Current Password");
      }
    }

    reset();
  }

  return (
    <div className="h-full w-full flex items-center p-2 justify-center bg-secondary pb-20">
      <div
        className="bg-secondary2 p-8 rounded-lg shadow-lg max-w-md w-full"
        style={flashUpStyle}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-testColor1">
          Change Password
        </h2>
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
