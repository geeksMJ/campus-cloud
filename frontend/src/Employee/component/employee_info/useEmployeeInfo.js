import { useQuery } from "@tanstack/react-query";
import { employeInfo } from "../../services/employe_info";

export function useEmployeeInfo(empId) {
  const { isLoading, data: employe_info } = useQuery({
    queryKey: ["employee"],
    queryFn: () => employeInfo(empId),
  });

  return {
    isLoading,
    employe_info,
  };
}
