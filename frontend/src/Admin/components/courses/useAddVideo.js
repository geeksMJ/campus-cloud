import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addVideo as addVideoApi } from "../../service/video";

let VideoData = [];

export function useAddVideo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => addVideoApi(data),

    onSuccess: (data) => {
      VideoData = data.video;
      queryClient.setQueryData(["video", data.video._id], data.video);
      toast.success("Video Uploaded Successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Video Can't Be Uploaded"); // Show the error message in a toast
    },
  });

  const { mutate: addVideo, status } = mutation;
  const isLoading = status === "pending";

  return { addVideo, isLoading, VideoData };
}
