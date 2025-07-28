import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { assignQuiz as assignQuizApi } from "../../service/employee";

export function useAssignQuiz() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => assignQuizApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEmployee"] });
      toast.success("Quiz Assigned Successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Quiz Can't Be Assigned"); // Show the error message in a toast
    },
  });

  const { mutate: assignQuiz, status } = mutation;
  const isLoading = status === "pending";

  return { assignQuiz, isLoading };
}
