import { useQuery } from "@tanstack/react-query";
import { search, spellcheck, suggestWord, getMoreLikeThis } from "./api";


export const useSearch = (
  input: string,
  category: string,
  start: number,
  authors: string[],
  rerank: boolean,
) => {
  return useQuery(
    ["search", input, category, start, authors.toString(), {rerank}],
    () => search({ input, category, start, authors, rerank }),
    { enabled: !!input }
  );
};

export const useSpellCheck = (input: string) => {
  return useQuery(["spell-check", input], () => spellcheck({ input }), {
    enabled: !!input,
  });
};

export const useSuggestWords = (input: string) => {
  return useQuery(["suggest", input], () => suggestWord({ input }), { 
    enabled: !!input})
};

export const useMoreLikeThis = (documentId: string) => {
  return useQuery(["mlt", documentId], () => getMoreLikeThis({ documentId }), {
    enabled: !!documentId,
  });
};
