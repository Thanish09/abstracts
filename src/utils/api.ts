import axios from "axios";
import { injectURLParams } from "./facets";
import { QueryFunction } from "@tanstack/react-query";

export type SearchParams = {
  input: string;
  category: string;
  start: number;
  authors: string[];
  rerank: boolean;
};

export type SearchResultType = {
  title: string;
  abstract: string;
  authors: string;
};
export const search = async ({
  input,
  category,
  start,
  authors,
  rerank,
}: SearchParams) => {
  const injectableParams = injectURLParams(authors, category);
  const rq = rerank
    ? `&rq={!ltr model=_OriginalRanking_ model=my_SCS_model_4 efi.text_dfi="${input.toLowerCase()}" efi.text_lmj="${input.toLowerCase()}"}`
    : "";
  const {
    data: {
      response: { docs },
      facet_counts: { facet_fields },
    },
  } = await axios.get(
    `http://localhost:8983/solr/abstracts/select?df=title&facet.field=authors&facet=true&fl=id%2Cscore%2Ctitle%2Cabstract%2Cauthors%2Cid&indent=true&q.op=OR&q='${input.toLowerCase()} OR abstract:${input.toLowerCase()}${injectableParams}'&start=${start}` +
      rq +
      "&useParams=",
    {
      method: "GET",
    }
  );

  return { docs, facet_fields };
};

export type SpellCheckParams = { input: string };
export const spellcheck = async ({ input }: SpellCheckParams) => {
  const {
    data: {
      spellcheck: { collations },
    },
  } = await axios.get(
    `http://localhost:8983/solr/abstracts/spell?df=title&spellcheck.q=${input}&spellcheck=true&spellcheck.collateParam.q.op=AND`
  );

  return collations;
};

type MoreLikeThisParams = {
  documentId: string;
};

type MoreLikeThisResponse = {
  response: {
    docs: {
      title: string;
      abstract: string;
    }[];
  };
};

export const getMoreLikeThis = async ({ documentId }: MoreLikeThisParams) => {
  const {
    data: {
      response: { docs },
    },
  } = await axios.get<MoreLikeThisResponse>(
    `http://localhost:8983/solr/abstracts/mlt?mlt.fl=abstract&mlt.interestingTerms=detail&mlt.match.include=true&mlt.mindf=0&mlt.mintf=0&q=id:${documentId}&fl=title,abstract`
  );

  return docs;
};

export type SuggestWordParams = { input: string };

export type SuggestionResponse = {
  suggest: {
    default: {
      [key: string]: {
        suggestions: { term: string }[];
      };
    };
  };
};
export const suggestWord = async ({ input }: SuggestWordParams) => {

  const {
    data: { suggest },
  } = await axios.get<SuggestionResponse>(
    `http://localhost:8983/solr/abstracts/suggest?suggest=true&suggest.dictionary=default&suggest.q=${input}`
  );
  return suggest.default;
};


