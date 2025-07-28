import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addDepartment as addDepartmentApi } from "../../service/department";

export function useAddDepartment() {
  const mutation = useMutation({
    mutationFn: (data) => addDepartmentApi(data),

    onSuccess: () => {
      toast.success("Department Created Successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message); // Show the error message in a toast
    },
  });

  const { mutate: addDepartment, status } = mutation;
  const isLoading = status === "pending";

  return { addDepartment, isLoading };
}
