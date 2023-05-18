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
