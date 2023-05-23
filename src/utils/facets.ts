import { spellcheck } from "./api";

export type Facet = {
  label: string;
  quantity: number;
};

export const flattenFacets = (facets: (string | number)[]): Facet[] => {
  let newFacets: Facet[] | null = [];

  for (let i = 0; i < facets.length; i = i + 2) {
    const f: Facet = {
      label: facets[i] as string,
      quantity: facets[i + 1] as number,
    };
    newFacets.push(f);
  }

  return newFacets;
};

export type SpellCheck = {
  collationQuery: string;
  hits: number;
  misspellingsAndCorrections: string[];
};

export const flattenSpellChecks = (
  spellcheck: (string | SpellCheck)[]
): SpellCheck[] => {
  let newSpellChecks: SpellCheck[] | null = [];

  for (let i = 1; i < spellcheck.length; i = i + 2) {
    newSpellChecks.push(spellcheck[i] as SpellCheck);
  }

  return newSpellChecks;
};

export const injectURLParams = (authors: string[], categories?: string) => {
  console.log("Am i running");
  let params = "";
  console.log(typeof categories);
  if (categories !== "") {
    console.log("Im running huu");
    params += ` AND categories%3A${categories}`;
  }

  if (authors?.length > 0) {
    console.log("Why am I runnig here");
    authors.forEach((a) => {
      params += ` AND authors%3A"${a}"`;
    });
  }

  return params;
};
