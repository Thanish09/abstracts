import axios from "axios";

export type SearchParams = {
  input: string;
  category: string;
};

export type SearchResultType = {
  title: string;
  abstract: string;
  authors: string;
};
export const search = async ({ input, category }: SearchParams) => {
  const {
    data: {
      response: { docs },
    },
  } = await axios.get(
    `http://localhost:8983/solr/abstracts/select?q=title:${input} categories:${category}&q.op=AND`,
    {
      method: "GET",
    }
  );

  return docs;
};
