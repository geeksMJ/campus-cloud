import { useAllCourse } from "../../../Admin/components/courses/useAllCourse";
import Spinner from "../../../Common/Ui/Spinner";

export default function SelectModule() {
  const { isLoading, allCourse } = useAllCourse();
  if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full bg-slate-300 flex items-center justify-center">
      <div className="w-5/12 h-[70vh] rounded bg-slate-400 border">
        {allCourse.map((couese) => (
          <div key={couese._id} className="w-full items-center justify-center">
            <p className="text-center">{couese.courseTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
