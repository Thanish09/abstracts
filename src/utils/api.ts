import axios from "axios";

export type SearchParams = {
  input: string;
  category: string;
  start: number;
};

export type SearchResultType = {
  title: string;
  abstract: string;
  authors: string;
};
export const search = async ({ input, category, start }: SearchParams) => {
  const {
    data: {
      response: { docs },
      facet_counts: { facet_fields },
    },
  } = await axios.get(
    `http://localhost:8983/solr/abstracts/select?facet.field=authors&facet=true&indent=true&q.op=OR&q=title%3A${input}%20categories%3A${category}&useParams&facet.field=versions.version&start=${
      start * 10
    }`,
    {
      method: "GET",
    }
  );

  return { docs, facet_fields };
};
