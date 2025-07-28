import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeAdmin as removeAdminApi } from "../../service/admin";

export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => removeAdminApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
      toast.success("Admin Deleted Successfully");
    },
    onError: () => {
      toast.error("Admin Can Not Be Deleted"); // Show the error message in a toast
    },
  });

  const { mutate: removeAdmin, status } = mutation;
  const isLoading = status === "pending";

  return { removeAdmin, isLoading };
}
