import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bulkEmployees as bulkEmployeesApi } from "../../service/employee";

export function useBulkEmployees() {
  const mutation = useMutation({
    mutationFn: (file) => bulkEmployeesApi(file),

    onSuccess: () => {
      toast.success("Employees Processed Successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message); // Show the error message in a toast
    },
  });

  const { mutate: bulkEmployees, status } = mutation;
  const isLoading = status === "pending";

  return { bulkEmployees, isLoading };
}
