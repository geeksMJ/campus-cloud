/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import SpinnerMini from "../../../Common/Ui/SpinnerMini";
import { useModuleByCourseId } from "../courses/useModuleByCourseId";
import { useAddModuleInQuiz } from "./useAddModuleInQuiz";

export default function SelectModule({ courseId, quizId, setSelectModule }) {
  const { isLoading: loadingModule, modules } = useModuleByCourseId(courseId);
  const { addModuleInQuiz, isLoading } = useAddModuleInQuiz();
  if (loadingModule) return <SpinnerMini />;
  return (
    <div>
      {modules.map((module) => (
        <div
          key={module._id}
          className="px-2 border border-b-0 py-1 cursor-pointer "
          onClick={() => {
            addModuleInQuiz({ quizId: quizId, module: module._id });
            setSelectModule(false);
          }}
        >
          <p className="hover:underline hover:scale-90 hover:font-semibold">
            {module.moduleName}
          </p>
        </div>
      ))}
    </div>
  );
}
