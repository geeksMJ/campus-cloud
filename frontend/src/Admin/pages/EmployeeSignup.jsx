/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import FormError from "../../Common/Ui/FormError";
import { useEmployeeSignup } from "../components/settings/useEmployeeSignup";
import SpinnerMini from "../../Common/Ui/SpinnerMini";
import BackButton from "../../Common/Ui/BackButton";
import Dropdown from "../ui/DropDown";
import { useUpdateEmployee } from "../components/settings/useUpdateEmployee";
import { useParams } from "react-router-dom";
import Spinner from "../../Common/Ui/Spinner";
import { useEmployeeById } from "../components/employee/useEmployeeById";
import { toast } from "react-toastify";

export default function EmployeeSignup({ editing = false }) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { empId } = useParams();

  const { updateEmployee, isLoading: updateEmployeeLoading } =
    useUpdateEmployee(empId);

  let isLoading, employee;
  if (editing) {
    ({ isLoading, employee } = useEmployeeById(empId));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { employeeSignup, isLoading: signingUp } = useEmployeeSignup();

  function onSubmit(data) {
    if (!editing) {
      if (!selectedDepartment) return null;
      employeeSignup(
        {
          empId: data.empid,
          employeeName: data.name,
          department: selectedDepartment,
          // designation: data.designation,
          password: data.password,
          joiningDate: data.joiningDate,
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
    } else {
      if (data.password !== data.confirmPassword) return null;
      if (selectedDepartment === "") {
        updateEmployee(
          {
            empId: data.empid,
            employeeName: data.name,
            designation: data.designation,
            password: data.password,
            joiningDate: data.joiningDate,
          },
          {
            onSuccess: () => {
              toast.success("Student Updated Successsfully");
            },
          }
        );
      } else {
        updateEmployee(
          {
            empId: data.empid,
            employeeName: data.name,
            designation: data.designation,
            department: selectedDepartment,
            password: data.password,
            joiningDate: data.joiningDate,
          },
          {
            onSuccess: () => {
              toast.success("Student Updated Successsfully");
            },
          }
        );
      }
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton />
      <div
        className={`h-full w-full flex items-center justify-center bg-gray-200 pb-20 overflow-y-auto ${
          !errors.empid ? "pt-20" : "pt-60"
        }`}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {!editing ? "Add New Student" : "Update Student"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empid"
              >
                Roll No.
              </label>
              <input
                type="text"
                disabled={signingUp || updateEmployeeLoading}
                id="empid"
                defaultValue={employee?.empId}
                placeholder="Enter Roll No."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("empid", {
                  required: "This field is required",
                })}
              />
              {errors.empid && <FormError error={errors.empid.message} />}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                defaultValue={employee?.employeeName}
                disabled={signingUp || updateEmployeeLoading}
                id="name"
                placeholder="Enter Name"
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
                htmlFor="department"
              >
                Department
              </label>
              <Dropdown
                selectedOption={selectedDepartment}
                setSelectedOption={setSelectedDepartment}
                default={employee?.department}
              />
            </div>

            {/* <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="designation"
              >
                Designation
              </label>
              <input
                defaultValue={employee?.designation}
                type="text"
                id="designation"
                placeholder="Enter Designation"
                disabled={signingUp || updateEmployeeLoading}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("designation", {
                  required: "This field is required",
                })}
              />
              {errors.designation && (
                <FormError error={errors.designation.message} />
              )}
            </div> */}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="joiningDate"
              >
                Joining Date
              </label>
              <input
                type="date"
                id="joiningDate"
                defaultValue={employee?.joiningDate}
                disabled={signingUp || updateEmployeeLoading}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("joiningDate", {
                  required: "This field is required",
                })}
              />
              {errors.joiningDate && (
                <FormError error={errors.joiningDate.message} />
              )}
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
                disabled={signingUp || updateEmployeeLoading}
                defaultValue={employee?.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
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
                disabled={signingUp || updateEmployeeLoading}
                defaultValue={employee?.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("confirmPassword", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
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
                className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? (
                  <SpinnerMini />
                ) : editing ? (
                  "Update Student"
                ) : (
                  "Add Student"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
