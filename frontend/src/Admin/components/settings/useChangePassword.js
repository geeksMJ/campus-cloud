/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePassword as changePasswordApi } from "../../service/admin";

export function useChangePassword() {
  const mutation = useMutation({
    mutationFn: (data) => changePasswordApi(data),

    onSuccess: () => {
      toast.success("Password Changed Sucessfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  const { mutate: changePassword, status } = mutation;
  const isLoading = status === "pending";

  return { changePassword, isLoading };
}
