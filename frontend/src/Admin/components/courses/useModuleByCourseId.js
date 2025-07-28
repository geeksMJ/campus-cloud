import { useQuery } from "@tanstack/react-query";

import { getModuleByCourseId } from "../../service/courses";

export function useModuleByCourseId(courseId) {
  const { isLoading, data: modules } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => getModuleByCourseId(courseId),
  });

  return {
    isLoading,
    modules,
  };
}
