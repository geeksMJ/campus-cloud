import React from "react";
import { useRemoveQuiz } from "../../../Admin/components/quiz/useRemoveQuiz";
import { useState } from "react";
import { useEmployeeInfo } from "../employee_info/useEmployeeInfo";
import SpinnerMini from "../../../Common/Ui/SpinnerMini";
import ShowMoreShowLess from "../../../Common/Ui/ShowMoreShowLess";

export default function QuizCard({ quiz, title, attempted, passed }) {
  // const { removeQuiz, isLoading } = useRemoveQuiz();
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const [token] = useState(localStorage.getItem("token"));
  const { employe_info, isLoading } = useEmployeeInfo(token);

  //   console.log("ye  le quiz", quiz);
  //   console.log("ye  le title", title);

  if (isLoading) return <SpinnerMini />;
  return (
    <div className="shadow-md rounded-lg p-4 bg-secondary2">
      <h2 className=" text-xl font-bold text-testColor1">
        <ShowMoreShowLess
          descriptionDetail={title}
          charNo="30"
          className="text-testColor1"
          isEmployee={true}
        />
      </h2>

      {attempted.includes(employe_info.empId) ? (
        passed.includes(employe_info.empId) ? (
          <div className="flex justify-end">
            <div className="bg-green-600 flex  w-18 text-center gap-1 text-testColor1  font-semibold rounded-full px-3 py-1">
              passed
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <div className="bg-red-600 flex  w-18 text-center gap-1 text-white  font-semibold rounded-full px-3 py-1">
              failed
            </div>
          </div>
        )
      ) : (
        <div className="flex gap-2 mt-4 item justify-end items-center">
          <button
            onClick={viewQuizHandler}
            className="bg-green-600 flex w-18 gap-1 text-black font-semibold rounded-full px-3 py-1"
          >
            <span className="mt-1">
              <GrView />
            </span>
            Attempt
          </button>
        </div>
      )}
    </div>
  );
}
