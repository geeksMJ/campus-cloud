import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addModule as addModuleApi } from "../../service/module";

export function useAddModule() {
  //   const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => addModuleApi(data),

    onSuccess: () => {
      toast.success("Module Uploaded Successfully");
    },
    onError: (err) => {
      console.log(err);
      // toast.error("Module Can't Be Uploaded"); // Show the error message in a toast
    },
  });

  const { mutate: addModule, status } = mutation;
  const isLoading = status === "pending";

  return { addModule, isLoading };
}
