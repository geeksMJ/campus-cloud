import { useQuery } from "@tanstack/react-query";

import { getCourseByCourseId } from "../../service/courses";

export function useCourseByCourseId(courseId) {
  const { isLoading, data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseByCourseId(courseId),
  });

  return {
    isLoading,
    course,
  };
}
