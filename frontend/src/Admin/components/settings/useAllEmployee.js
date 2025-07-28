import { useQuery } from "@tanstack/react-query";
import { showAllEmployee } from "../../service/employee";

export function useAllEmployee() {
  const { isLoading, data: allEmployee } = useQuery({
    queryKey: ["allEmployee"],
    queryFn: () => showAllEmployee(),
  });

  return {
    isLoading,
    allEmployee,
  };
}
