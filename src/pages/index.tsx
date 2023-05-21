import {
  EuiSelect,
  EuiSearchBar,
  useGeneratedHtmlId,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTextAlign,
  EuiSearchBarOnChangeArgs,
  QueryType,
  Query,
  EuiPagination,
} from "@elastic/eui";
import React, { useEffect, useState, useMemo } from "react";
import { euiPaletteColorBlind } from "@elastic/eui";
import Group, { FacetGroupProps } from "@/components/Facets/Group";
import { flattenFacets } from "@/utils/facets";
import { useSearch } from "@/utils/queries";
import { dropdownOptions } from "@/constants/options";
import List from "@/components/Results/List";
import Suggestions from "@/components/Suggestions";

const initialQuery = EuiSearchBar.Query.MATCH_ALL;

export default function Home() {
  const [query, setQuery] = useState<QueryType | null>(initialQuery);
  const [value, setValue] = useState(dropdownOptions[0].value);
  const [incremental, setIncremental] = useState(false);
  const [activePage, setActivePage] = useState(0);

  const {
    data: results,
    isLoading: isResultsLoading,
    isError: isResultError,
  } = useSearch((query as Query)?.text || "", value, activePage);

  const FACETS: FacetGroupProps[] = useMemo(
    () => [
      {
        title: "Authors",
        color: euiPaletteColorBlind()[0],

        facets: flattenFacets(results?.facet_fields?.authors || []),
      },
      {
        title: "Versions",
        color: euiPaletteColorBlind()[1],
        facets: flattenFacets(
          results?.facet_fields?.["versions.version"] || []
        ),
      },
    ],
    [results?.facet_fields]
  );

  const basicSelectId = useGeneratedHtmlId({ prefix: "basicSelect" });

  const onDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const onSearchChange = ({ query, error }: EuiSearchBarOnChangeArgs) => {
    setQuery(query);
  };

  const renderSearch = () => {
    const schema = {
      strict: true,
      fields: {
        title: {
          type: "string",
        },
      },
    };

    return (
      <EuiSearchBar
        defaultQuery={initialQuery}
        box={{
          placeholder: "Search something...",
          incremental,
          schema,
        }}
        onChange={onSearchChange}
        query={query as Query}
      />
    );
  };

  return (
    <>
      <EuiSpacer />
      <EuiText>
        <EuiTextAlign textAlign="center">
          <h1>SDSS</h1>
        </EuiTextAlign>
      </EuiText>
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem grow={false}>SDSS</EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={true} style={{ maxWidth: 700 }}>
          {renderSearch()}
        </EuiFlexItem>
        <EuiSpacer />
        <EuiFlexItem grow={false}>
          <EuiSelect
            id={basicSelectId}
            options={dropdownOptions}
            value={value}
            onChange={(e) => onDropdownChange(e)}
            aria-label="Use aria labels when no actual label is in use"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
          {FACETS.map((facet) => (
            <>
              <EuiSpacer />
              <Group
                isLoading={isResultsLoading}
                key={facet.title}
                title={facet.title}
                facets={facet.facets}
                color={facet.color}
              />
            </>
          ))}
        </EuiFlexItem>
        <EuiFlexItem>
          <List items={results?.docs} isLoading={isResultsLoading} />
          <EuiPagination
            pageCount={0}
            activePage={activePage}
            onPageClick={(acP) => setActivePage(acP)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <Suggestions />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}
