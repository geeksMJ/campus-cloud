import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadCertificate as uploadCertificateApi } from "../../service/admin";

export const useUploadCertificate = () => {
  const mutation = useMutation({
    mutationFn: (file) => uploadCertificateApi(file),
    onSuccess: () => {
      toast.success("Certificate uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error uploading certificate");
    },
  });

  const { mutate: uploadCertificate, status } = mutation;
  const isLoading = status === 'pending';

  return { uploadCertificate, isLoading };
};
