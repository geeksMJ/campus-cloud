import { useQuery } from "@tanstack/react-query";

import { getCertificate } from "../../service/admin";

export function useGetCertificate() {
  const { isLoading, data: certificate} = useQuery({
    queryKey: ["certificate"],
    queryFn: () => getCertificate(),
  });
  console.log(certificate)

  return {
    isLoading,
    certificate,
  };
}
