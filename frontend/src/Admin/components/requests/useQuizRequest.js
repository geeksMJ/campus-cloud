import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { quizRequest as quizRequestApi } from "../../service/requests";

export function useQuizRequest() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => quizRequestApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRequest"] });
      toast.success("Request accepted Successfully");
    },
    onError: () => {
      toast.error("Request Can't Be Send");

      // toast.error("Module Can't Be Uploaded"); // Show the error message in a toast
    },
  });

  const { mutate: quizRequest, status } = mutation;
  const isLoading = status === "pending";

  return { quizRequest ,isLoading };
}
