import { useQuery } from "@tanstack/react-query";

import { getCourseByEmpId } from "../../service/courses";

export function useCourseByEmpId(empId) {
  const { isLoading, data: courses } = useQuery({
    queryKey: ["courseByEmpId", empId],
    queryFn: () => getCourseByEmpId(empId),
  });

  return {
    isLoading,
    courses,
  };
}
