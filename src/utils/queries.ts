import { useQuery } from "@tanstack/react-query";
import { search } from "./api";

export const useSearch = (input: string, category: string) => {
  return useQuery(["search", input, category], () =>
    search({ input, category })
  );
};
