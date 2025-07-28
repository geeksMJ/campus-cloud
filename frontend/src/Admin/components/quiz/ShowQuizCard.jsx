/* eslint-disable react/prop-types */
import { GrView } from "react-icons/gr";
import ShowMoreShowLess from "../../../Common/Ui/ShowMoreShowLess";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRemoveQuiz } from "./useRemoveQuiz";
import SpinnerMini from "../../../Common/Ui/SpinnerMini";
import ModuleName from "../../../Employee/Ui/ModuleName";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useEmployeeInfo } from "../../../Employee/component/employee_info/useEmployeeInfo";

export default function ShowQuizCard({
  id,
  attempted,
  passed,
  title,
  moduleId,
  viewQuizHandler,
  department,
  isEmployee = false,
}) {
  const { removeQuiz, isLoading } = useRemoveQuiz();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [token] = useState(localStorage.getItem("token"));
  const { employe_info } = useEmployeeInfo(token);

  // console.log(employe_info);

  // console.log("ye le", title);

  // console.log("ye le", attempted);
  // console.log("ye le", passed);

  if (isLoading) return <SpinnerMini />;
  return (
    <div
      className={`shadow-md rounded-lg p-4 ${
        isEmployee ? "bg-secondary2" : "bg-gray-100"
      }`}
    >
      <h2 className=" text-xl font-bold">
        <ShowMoreShowLess descriptionDetail={title} charNo="30" />
      </h2>
      <div className="text-gray-600">
        {department.length !== 0 && (
          <>
            <p className="font-semibold text-gray-900">Departments</p>
            <ul>
              {department.map((d, index) => (
                <li key={index}>{d}</li>
              ))}
            </ul>{" "}
          </>
        )}
        {moduleId && <ModuleName moduleId={moduleId} />}
      </div>

      <div className="flex gap-2 mt-4 item justify-end items-center">
        <button
          onClick={viewQuizHandler}
          className="bg-green-600 flex w-18 gap-1 text-white font-semibold rounded-full px-3 py-1"
        >
          <span className="mt-1">
            <GrView />
          </span>
          View
        </button>

        <button
          onClick={() => {
            setConfirmDelete(true);
          }}
          disabled={isLoading}
          className="flex items-center gap-2 bg-red-600 text-white font-semibold px-4 py-1 rounded-full hover:bg-red-700"
        >
          <span className="text-xl">
            <RiDeleteBin6Line />
          </span>
          Remove
        </button>
      </div>

      {confirmDelete && (
        <ConfirmDelete
          what="Quiz"
          who={title}
          handelClick={() => {
            removeQuiz(id);
          }}
          close={setConfirmDelete}
        />
      )}
    </div>
  );
}
