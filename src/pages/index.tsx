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
import React, { useEffect, useState, useMemo, useRef } from "react";
import Lottie from "lottie-react";
import { euiPaletteColorBlind } from "@elastic/eui";
import { css } from "@emotion/react";
import Group, { FacetGroupProps } from "@/components/Facets/Group";
import { flattenFacets, flattenSpellChecks } from "@/utils/facets";
import { useSearch, useSpellCheck } from "@/utils/queries";
import { dropdownOptions } from "@/constants/options";
import List from "@/components/Results/List";
import Suggestions from "@/components/Suggestions";
import ResultPreview, { PreviewType } from "@/components/Results/ResultPreview";
import Placeholder from "@/components/Placeholder";
import Keyword from "@/components/Keyword";
import SEARCH from "../assets/search.json"

const initialQuery = EuiSearchBar.Query.MATCH_ALL;

export default function Home() {
  const [query, setQuery] = useState<QueryType | null>(null);
  const [value, setValue] = useState("");
  const [incremental, setIncremental] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const {
    data: results,
    isLoading: isResultsLoading,
    isError: isResultError,
  } = useSearch(
    (query as Query)?.text || (query as string) || "",
    value,
    activePage,
    selectedAuthors
  );
  console.log(value);
  const {
    data: spellChecks,
    isLoading: isSpellChecksLoading,
    isError: isSpellChackError,
  } = useSpellCheck((query as Query)?.text || (query as string) || "");
  const resultPreviewRef = useRef<React.ElementRef<typeof ResultPreview>>(null);

  const sortedAuthors = useMemo(() => {
    const listOfAuthors = flattenFacets(results?.facet_fields?.authors || []);
    const orderAuthors = [
      ...listOfAuthors.filter((author) =>
        selectedAuthors.includes(author.label)
      ),
      ...listOfAuthors.filter(
        (author) => !selectedAuthors.includes(author.label)
      ),
    ];

    return orderAuthors.filter((author) => author.quantity > 0);
  }, [results]);

  const handleClickAuthors = (author: string) => {
    if (!!selectedAuthors.includes(author)) {
      const filteredAuthors = selectedAuthors.filter((ath) => ath !== author);
      setSelectedAuthors(() => [...filteredAuthors]);
    } else {
      setSelectedAuthors((prev) => [...prev, author]);
    }
  };

  const handleClickVersions = (version: string) => {
    setSelectedVersions((prev) => [...prev, version]);
  };

  const FACETS: Pick<
    FacetGroupProps,
    "title" | "color" | "onClick" | "facets"
  >[] = useMemo(
    () => [
      {
        title: "Authors",
        color: euiPaletteColorBlind()[0],
        onClick: handleClickAuthors,
        facets: sortedAuthors,
      },
      {
        title: "Versions",
        color: euiPaletteColorBlind()[1],
        onClick: handleClickVersions,
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
    setQuery(query?.text || "");
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

  const handleClickKeyword = (key: string) => {
    setQuery(key);
  };

  const handlePreview = (p: PreviewType) => {
    resultPreviewRef.current?.onPreview(p);
  };
  console.log(!!query);
  console.log(isResultsLoading)
  return (
    <>
      <EuiSpacer />
      <EuiEmptyPrompt
        icon={<Lottie style={{ height: 50 }} animationData={SEARCH} loop={true} />}
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
            onChange={(e) => onDropdownChange(e)}
            aria-label="Use aria labels when no actual label is in use"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ alignItems: "center" }}>
          <EuiSwitch
            label="Re-rank search"
            checked={false}
            onChange={(e) => onChange(e)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      {!!query ? (
        <>
          <EuiFlexGroup justifyContent="center" direction="column">
            <EuiSpacer size="xs" />
            <EuiFlexGroup justifyContent="center">
              <EuiTitle size="xxxs">
                <h6>Suggested keywords</h6>
              </EuiTitle>
            </EuiFlexGroup>
            <EuiFlexGroup justifyContent="center">
              {spellChecks ? (
                flattenSpellChecks(spellChecks)
                  .filter((spl, idx) => {
                    if (idx < 4) return spl;
                  })
                  .map((kw, idx) => (
                    <Keyword
                      keyword={kw.collationQuery}
                      color={idx}
                      //@ts-ignore
                      onClick={handleClickKeyword}
                    />
                  ))
              ) : (
                <></>
              )}
            </EuiFlexGroup>
          </EuiFlexGroup>

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
                    onClick={facet.onClick}
                    selectedList={selectedAuthors}
                  />
                  <EuiSpacer style={{ width: 300 }} />
                </>
              ))}
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <List
                items={results?.docs}
                isLoading={isResultsLoading}
                handlePreview={handlePreview}
              />

              <EuiPagination
                style={{ maxWidth: 300 }}
                pageCount={0}
                activePage={activePage}
                onPageClick={(acP) => setActivePage(acP)}
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{ marginTop: "1rem" }}>
              <ResultPreview
                ref={resultPreviewRef}
                handleOpenMLT={handleClickKeyword}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </>
      ) : (
        <Placeholder />
      )}
    </>
  );
}
