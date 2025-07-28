import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeQuiz as removeQuizApi } from "../../service/quiz";


export function useRemoveQuiz() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => removeQuizApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allQuiz"] });
      toast.success("Quiz Deleted Successfully");
    },
    onError: () => {
      toast.error("Quiz Can Not Be Deleted"); // Show the error message in a toast
    },
  });

  const { mutate: removeQuiz, status } = mutation;
  const isLoading = status === "pending";

  return { removeQuiz ,isLoading };
}
