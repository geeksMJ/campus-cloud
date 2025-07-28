import { useQuery } from "@tanstack/react-query";

import { showRespnseById } from "../../service/quiz";

export function useRespnseById(id) {
  const { isLoading, data: response } = useQuery({
    queryKey: ["response", id],
    queryFn: () => showRespnseById(id),
  });

  return {
    isLoading,
    response,
  };
}
