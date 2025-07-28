import { useMutation } from "@tanstack/react-query";
import { quizAtempted } from "../../service/quiz";

export function useQuizAttempt() {
  const mutation = useMutation({
    mutationFn: (data) => quizAtempted(data),

    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: quizAttempt, status } = mutation;
  const isLoading = status === "pending";

  return { quizAttempt, isLoading };
}
