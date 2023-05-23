import {
  EuiSelect,
  EuiSearchBar,
  useGeneratedHtmlId,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSearchBarOnChangeArgs,
  QueryType,
  Query,
  EuiPagination,
  EuiEmptyPrompt,
  EuiLoadingLogo,
  EuiCallOut,
  EuiLink,
  EuiButton,
  EuiSwitch,
  EuiBetaBadge,
  EuiTitle,
  EuiBadge,
} from "@elastic/eui";
import React, { useEffect, useState, useMemo } from "react";
import { euiPaletteColorBlind } from "@elastic/eui";
import { css } from "@emotion/react";
import Group, { FacetGroupProps } from "@/components/Facets/Group";
import { flattenFacets } from "@/utils/facets";
import { useSearch } from "@/utils/queries";
import { dropdownOptions } from "@/constants/options";
import List from "@/components/Results/List";
import Suggestions from "@/components/Suggestions";
import ResultPreview from "@/components/Results/ResultPreview";
import Placeholder from "@/components/Placeholder";
import Keyword from "@/components/Keyword";

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
  //console.log(query);
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
      <EuiEmptyPrompt
        icon={<EuiLoadingLogo logo="logoKibana" size="xl" />}
        title={<h2>Arxiv Search</h2>}
        body={<p>powered by Solr Search</p>}
      />

      <EuiSpacer />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={true} style={{ maxWidth: 700 }}>
          {renderSearch()}
        </EuiFlexItem>
        {/* <EuiSpacer /> */}
        <EuiFlexItem grow={false}>
          <EuiSelect
            id={basicSelectId}
            options={dropdownOptions}
            value={value}
            onChange={(e) => onDropdownChange(e)}
            aria-label="Use aria labels when no actual label is in use"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ alignItems: "center" }}>
          <EuiSwitch
            label="Boost search"
            checked={false}
            onChange={(e) => onChange(e)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiFlexGroup justifyContent="center" direction="column">
        <EuiSpacer size="xs" />
        <EuiFlexGroup justifyContent="center">
          <EuiTitle size="xxxs">
            <h6>Suggested keywords</h6>
          </EuiTitle>
        </EuiFlexGroup>
        <EuiFlexGroup justifyContent="center">
          <Keyword
            keyword="automata theory"
            color={2}
            //@ts-ignore
            onClick={(e) => setQuery(e.target.outerText)}
          />
        </EuiFlexGroup>
      </EuiFlexGroup>
      {!!results || !!isResultsLoading ? (
        <EuiFlexGroup justifyContent="center" style={{ marginTop: "2rem" }}>
          <EuiFlexItem grow={0} style={{ marginTop: "1rem" }}>
            {FACETS.map((facet) => (
              <>
                <Group
                  isLoading={isResultsLoading}
                  key={facet.title}
                  title={facet.title}
                  facets={facet.facets}
                  color={facet.color}
                />
                <EuiSpacer style={{ width: 300 }} />
              </>
            ))}
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <List items={results?.docs} isLoading={isResultsLoading} />

            <EuiPagination
              style={{ maxWidth: 300 }}
              pageCount={0}
              activePage={activePage}
              onPageClick={(acP) => setActivePage(acP)}
            />
          </EuiFlexItem>
          {/* <EuiFlexItem grow={false} style={{ marginTop: "1rem" }}>
            <Suggestions />
          </EuiFlexItem> */}
        </EuiFlexGroup>
      ) : (
        <Placeholder />
      )}
    </>
  );
}
