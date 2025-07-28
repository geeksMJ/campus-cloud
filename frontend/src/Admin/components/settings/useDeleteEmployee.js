import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeEmployee as removeEmployeeApi } from "../../service/employee";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => removeEmployeeApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEmployee"] });
      toast.success("Employee Deleted Successfully");
    },
    onError: () => {
      toast.error("Employee Can Not Be Deleted"); // Show the error message in a toast
    },
  });

  const { mutate: removeEmployee, status } = mutation;
  const isLoading = status === "pending";

  return { removeEmployee, isLoading };
}
