import { useQuery } from "@tanstack/react-query";
import { search } from "./api";

export const useSearch = (input: string, category: string, start: number) => {
  return useQuery(["search", input, category, start], () =>
    search({ input, category, start }), {enabled: !!input}
  );
};
