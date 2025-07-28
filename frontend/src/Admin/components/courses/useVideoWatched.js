import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVideoWatched as addVideoWatchedApi } from "../../service/video";

export function useVideoWatched(videoId, courseId) {
  const queryClient = useQueryClient();
  //   const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => addVideoWatchedApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video", videoId] });
      queryClient.invalidateQueries({
        queryKey: ["videosByCourseId", courseId],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: addVideoWatched, status } = mutation;
  const isLoading = status === "pending";

  return { addVideoWatched, isLoading };
}
