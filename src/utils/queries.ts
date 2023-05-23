import { useQuery } from "@tanstack/react-query";
import { getMoreLikeThis, search, spellcheck } from "./api";

export const useSearch = (
  input: string,
  category: string,
  start: number,
  authors: string[]
) => {
  return useQuery(
    ["search", input, category, start, authors.toString()],
    () => search({ input, category, start, authors }),
    { enabled: !!input }
  );
};

export const useSpellCheck = (input: string) => {
  return useQuery(["spell-check", input], () => spellcheck({ input }), {
    enabled: !!input,
  });
};

export const useMoreLikeThis = (documentId: string) => {
  return useQuery(["mlt", documentId], () => getMoreLikeThis({ documentId }), {
    enabled: !!documentId,
  });
};
