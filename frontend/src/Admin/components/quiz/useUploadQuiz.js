import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadQuiz as uploadQuizApi } from "../../service/quiz";

export function useUploadQuiz() {
  const mutation = useMutation({
    mutationFn: (data) => uploadQuizApi(data),

    onSuccess: () => {
      toast.success("Quiz Uploaded Successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message); // Show the error message in a toast
    },
  });

  const { mutate: uploadQuiz, status } = mutation;
  const isLoading = status === "pending";

  return { uploadQuiz, isLoading };
}
