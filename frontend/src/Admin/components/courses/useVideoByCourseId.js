import { useQuery } from "@tanstack/react-query";

import { getVideoByCourseId } from "../../service/video";

export function useVideoByCourseId(courseId) {
  const { isLoading, data: videos } = useQuery({
    queryKey: ["videosByCourseId", courseId],
    queryFn: () => getVideoByCourseId(courseId),
  });

  return {
    isLoading,
    videos,
  };
}
