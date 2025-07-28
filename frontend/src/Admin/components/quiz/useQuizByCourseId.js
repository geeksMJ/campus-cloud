import { useQuery } from "@tanstack/react-query";

import { getQuizByCourseId } from "../../service/quiz";

export function useQuizByCourseId(courseId) {
  const { isLoading, data: quizs } = useQuery({
    queryKey: ["quiz", courseId],
    queryFn: () => getQuizByCourseId(courseId),
  });

  return {
    isLoading,
    quizs,
  };
}
