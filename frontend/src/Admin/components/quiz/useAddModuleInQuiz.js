import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addModuleInQuiz as addModuleInQuizApi } from "../../service/quiz";

export function useAddModuleInQuiz() {
  const mutation = useMutation({
    mutationFn: (data) => addModuleInQuizApi(data),

    onSuccess: () => {
      toast.success("Quiz Updated");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message); // Show the error message in a toast
    },
  });

  const { mutate: addModuleInQuiz, status } = mutation;
  const isLoading = status === "pending";

  return { addModuleInQuiz, isLoading };
}
