import { useQuery } from "@tanstack/react-query";

import { getCourseNotByEmpId } from "../../service/courses";

export function useCourseNotByEmpId(empId) {
  const { isLoading, data: courses } = useQuery({
    queryKey: ["getCourseNotDepartmentName", empId],
    queryFn: () => getCourseNotByEmpId(empId),
  });

  return {
    isLoading,
    courses,
  };
}
