import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeDepartment as removeDepartmentApi } from "../../service/department";

export function useDeleteDepartment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => removeDepartmentApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allDepartment"] });
      toast.success("Department Deleted Successfully");
    },
    onError: () => {
      toast.error("Department Can Not Be Deleted"); // Show the error message in a toast
    },
  });

  const { mutate: removeDepartment, status } = mutation;
  const isLoading = status === "pending";

  return { removeDepartment, isLoading };
}
