import { EuiSelect, EuiSearchBar, useGeneratedHtmlId, EuiHealth, EuiCallOut, EuiSpacer, EuiBasicTable } from "@elastic/eui";
import axios from "axios";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import ResultsBox from "@/components/ResultsBox";

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
];

const loadTags = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(
        tags.map((tag) => ({
          value: tag.name,
          view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
        }))
      );
    }, 2000);
  });
};

const initialQuery = EuiSearchBar.Query.MATCH_ALL;

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);
  const [incremental, setIncremental] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const onChange = ({ query, error }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

  useEffect(() => {
    if (query.text.length > 0) {
      axios
        .get(
          `http://localhost:8983/solr/abstracts/select?q=title:${query.text}`
        )
        .then((response) => {
          setResults(response.data.response.docs);
        });
    }
  }, [query]);
  console.log(results);

  const toggleIncremental = () => {
    setIncremental((prev) => !prev);
  };

  const toggleHint = () => {
    setShowHint((prev) => !prev);
  };

  const renderSearch = () => {
    const filters = [{
      type: 'field_value_selection',
      field: 'tag',
      name: 'Tag',
      multiSelect: 'or',
      operator: 'exact',
      cache: 10000, // will cache the loaded tags for 10 sec
      options: () => loadTags()
    }];

    const schema = {
      strict: true,
      fields: {
        title: {
          type: 'string',
        },
        tag: {
          type: 'string',
          validate: (value) => {
            if (value !== '' && !tags.some((tag) => tag.name === value)) {
              throw new Error(
                `unknown tag (possible values: ${tags
                  .map((tag) => tag.name)
                  .join(',')})`
              );
            }
          },
        },
      },
    };

    return (
      <EuiSearchBar
        defaultQuery={initialQuery}
        box={{
          placeholder: 'Search something...',
          incremental,
          schema,
        }}
        //filters = {filters}
        query={query}
        onChange={onChange}
      />
    );
  };

  const renderError = () => {
    if (!error) {
      return;
    }
    return (
      <Fragment>
        <EuiCallOut
          iconType="faceSad"
          color="danger"
          title={`Invalid search: ${error.message}`}
        />
        <EuiSpacer size="l" />
      </Fragment>
    );
  };

  const renderTable = () => {
    const columns = [
      {
        name: 'Title',
        field: 'title',
      },
      {
        name: 'Tags',
        field: 'tag',
      },
    ];

    const queriedItems = EuiSearchBar.Query.execute(query, items, {
      defaultFields: ['owner', 'tag', 'type'],
    });

    return <EuiBasicTable items={queriedItems} columns={columns} />;
  };

  let esQueryDsl;
  let esQueryString;

  try {
    esQueryDsl = EuiSearchBar.Query.toESQuery(query);
  } catch (e) {
    esQueryDsl = e.toString();
  }
  try {
    esQueryString = EuiSearchBar.Query.toESQueryString(query);
  } catch (e) {
    esQueryString = e.toString();
  }

  return (
    <Fragment>
      {renderSearch()}
      {results?.map((result, index) => (
        <ResultsBox
        key={index}
        title= {result.title}
        abstract={result.abstract}
        authors={result.authors}
        ></ResultsBox>
      ))}
    </Fragment>
  );
};
