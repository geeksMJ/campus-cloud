import { useQuery } from "@tanstack/react-query";
import { showAllCourse } from "../../service/courses";

export function useAllCourse() {
  const { isLoading, data: allCourse } = useQuery({
    queryKey: ["allCourse"],
    queryFn: () => showAllCourse(),
  });

  return {
    isLoading,
    allCourse,
  };
}
