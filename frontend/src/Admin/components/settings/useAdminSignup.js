import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminSignup as adminSignupApi } from "../../service/admin";

export function useAdminSignup() {
  const mutation = useMutation({
    mutationFn: (data) => adminSignupApi(data),

    onSuccess: () => {
      toast.success("Admin Created Successfully");
    },
    onError: (err) => {
      toast.error(err.message); // Show the error message in a toast
    },
  });

  const { mutate: adminSignup, status } = mutation;
  const isLoading = status === "pending";

  return { adminSignup, isLoading };
}
