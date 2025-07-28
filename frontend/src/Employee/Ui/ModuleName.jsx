/* eslint-disable react/prop-types */

import SpinnerMini from "../../Common/Ui/SpinnerMini";
import { useGetModule } from "../../Admin/components/courses/useGetModule";
import CourseName from "./CourseName";

export default function ModuleName({ moduleId }) {
  const { isLoading, module } = useGetModule(moduleId);

  if (isLoading) return <SpinnerMini />;
  return (
    <p className="px-2 py-1  cursor-pointer">
      <div className="flex items-center">
        Course : <CourseName course={module.course} admin={true} />
      </div>
      Module : {module.moduleName}
    </p>
  );
}
