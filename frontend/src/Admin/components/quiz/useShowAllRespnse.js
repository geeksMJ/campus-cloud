import { useQuery } from "@tanstack/react-query";

import { showAllRespnse } from "../../service/quiz";

export function useShowAllRespnse(quizId) {
  const { isLoading, data: allResponse } = useQuery({
    queryKey: ["AllRespnse", quizId],
    queryFn: () => showAllRespnse(quizId),
  });

  return {
    isLoading,
    allResponse,
  };
}
