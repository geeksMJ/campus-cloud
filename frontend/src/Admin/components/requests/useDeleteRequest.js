import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeRequest as removeRequestApi } from "../../service/requests";

export function useDeleteRequest() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => removeRequestApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRequest"] });
    },
    onError: () => {},
  });

  const { mutate: removeRequest, status } = mutation;
  const isLoading = status === "pending";

  return { removeRequest, isLoading };
}
