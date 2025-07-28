import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../../service/employee";

export function useEmployeeById(empId) {
  const { isLoading, data: employee } = useQuery({
    queryKey: ["employee", empId],
    queryFn: () => getEmployeeById(empId),
  });

  return {
    isLoading,
    employee,
  };
}
