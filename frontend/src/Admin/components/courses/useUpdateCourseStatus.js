import { useMutation } from "@tanstack/react-query";

import { updateCourseStatus as updateCourseStatusApi } from "../../service/courses";

export function useUpdateCourseStatus() {
  //   const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => updateCourseStatusApi(data),

    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
      // toast.error("Module Can't Be Uploaded"); // Show the error message in a toast
    },
  });

  const { mutate: updateCourseStatus, status } = mutation;
  const isLoading = status === "pending";

  return { updateCourseStatus, isLoading };
}
