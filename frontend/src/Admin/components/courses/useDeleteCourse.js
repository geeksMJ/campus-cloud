import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeCourse as removeCourseApi} from "../../service/courses";

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => removeCourseApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCourse"] });
      toast.success("Course Deleted Successfully");
    },
    onError: () => {
      toast.error("Course Can Not Be Deleted"); // Show the error message in a toast
    },
  });

  const { mutate: removeCourse, status } = mutation;
  const isLoading = status === "pending";

  return { removeCourse ,isLoading };
}
