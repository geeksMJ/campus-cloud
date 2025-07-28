import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminlogin as AdminloginApi } from "../../../Common/service/auth";
import toast from "react-hot-toast";

export function useAdminLogin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => AdminloginApi(data),

    onSuccess: (data) => {
      queryClient.setQueryData("adminEmail", data);
      localStorage.setItem("adminEmail", data.email);
      toast.success("Admin Login Successfully");
    },
    onError: () => {
      toast.error("Provided Email or password are incorrect");
    },
  });

  const { mutate: adminLogin, status } = mutation;
  const isLoading = status === "pending";

  return { adminLogin, isLoading };
}
