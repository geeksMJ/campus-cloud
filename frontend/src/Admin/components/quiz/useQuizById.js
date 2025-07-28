import { useQuery } from "@tanstack/react-query";
import { showQuizesById } from "../../service/quiz";

export function useQuizId(id) {
  const { isLoading, data: quiz } = useQuery({
    queryKey: ["quiz", id],
    queryFn: () => showQuizesById(id),

  });
  return {
    isLoading,
    quiz,
  };
}
