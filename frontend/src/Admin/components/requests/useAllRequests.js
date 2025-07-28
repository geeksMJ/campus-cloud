import { useQuery } from "@tanstack/react-query";
import { showAllRequest } from "../../service/requests";

export function useAllRequest() {
  const { isLoading, data: allRequest } = useQuery({
    queryKey: ["allRequest"],
    queryFn: () => showAllRequest(),
  });

  return {
    isLoading,
    allRequest,
  };
}
