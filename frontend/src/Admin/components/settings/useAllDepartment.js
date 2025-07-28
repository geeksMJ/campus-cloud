import { useQuery } from "@tanstack/react-query";
import { showAllDepartment } from "../../service/department";

export function useAllDepartment() {
  const { isLoading, data: allDepartment } = useQuery({
    queryKey: ["allDepartment"],
    queryFn: () => showAllDepartment(),
  });

  return {
    isLoading,
    allDepartment,
  };
}
