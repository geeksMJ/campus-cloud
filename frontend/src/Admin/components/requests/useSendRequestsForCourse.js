import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { sendRequestsForCourse as sendRequestsForCourseApi } from "../../service/requests";

export function useSendRequestsForCourse() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => sendRequestsForCourseApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRequest"] });
      toast.success("Request Send Successfully");
    },
    onError: () => {
      toast.error("Request Can't Be Send");

      // toast.error("Module Can't Be Uploaded"); // Show the error message in a toast
    },
  });

  const { mutate: sendRequestsForCourse, status } = mutation;
  const isLoading = status === "pending";

  return { sendRequestsForCourse, isLoading };
}
