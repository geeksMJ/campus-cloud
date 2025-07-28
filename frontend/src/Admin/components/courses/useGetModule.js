import { useQuery } from "@tanstack/react-query";
import { getModuleById } from "../../service/module";

export function useGetModule(moduleId) {
  const { isLoading, data: module } = useQuery({
    queryKey: ["module", moduleId],
    queryFn: () => getModuleById(moduleId),
  });

  return {
    isLoading,
    module,
  };
}
