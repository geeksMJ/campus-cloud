import { useQuery } from "@tanstack/react-query";

import { showAllAdmin } from "../../service/admin";

export function useAllAdmin() {
  const { isLoading, data: allAdmin } = useQuery({
    queryKey: ["allAdmins"],
    queryFn: () => showAllAdmin(),
  });

  return {
    isLoading,
    allAdmin,
  };
}
