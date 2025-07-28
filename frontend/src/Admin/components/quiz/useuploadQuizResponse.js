import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadQuizResponse as uploadQuizResponseApi } from "../../service/quiz";

export function useUploadQuizResponse() {
  const mutation = useMutation({
    mutationFn: (data) => uploadQuizResponseApi(data),

    onSuccess: () => {
      toast.success("Quiz Submited Wait For Your Result");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error While Submiting The Quiz"); // Show the error message in a toast
    },
  });

  const { mutate: uploadQuizResponse, status } = mutation;
  const isLoading = status === "pending";

  return { uploadQuizResponse, isLoading };
}
