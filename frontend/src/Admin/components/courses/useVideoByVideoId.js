import { useQuery } from "@tanstack/react-query";

import { getVideoByVideoId } from "../../service/courses";

export function useVideoByVideoId(videoId) {
  const { isLoading, data: video } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoByVideoId(videoId),
  });

  return {
    isLoading,
    video,
  };
}
