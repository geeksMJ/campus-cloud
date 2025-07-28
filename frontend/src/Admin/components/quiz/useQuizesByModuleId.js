import { useQuery } from "@tanstack/react-query";
import { showQuizesByModuleId } from "../../service/quiz";

export function useQuizesByModuleId(moduleId) {
  const { isLoading, data: quiz } = useQuery({
    queryKey: ["quizByModuleId", moduleId],
    queryFn: () => showQuizesByModuleId(moduleId),
  });

  return {
    isLoading,
    quiz,
  };
}
