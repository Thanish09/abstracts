import axios from "axios";
import { injectURLParams } from "./facets";

export type SearchParams = {
  input: string;
  category: string;
  start: number;
  authors: string[];
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
}: SearchParams) => {
  const injectableParams = injectURLParams(authors, category);
  console.log(injectableParams);
  const {
    data: {
      response: { docs },
      facet_counts: { facet_fields },
    },
  } = await axios.get(
    `http://localhost:8983/solr/abstracts/select?df=title&facet.field=authors&facet=true&fl=id%2Cscore%2Ctitle%2Cabstract%2Cauthors&indent=true&q.op=OR&q=${input}${injectableParams}&start=${start}&useParams=`,
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
  console.log(collations);
  return collations;
};
