import React, { useState, Fragment } from 'react';
import {
  EuiHealth,
  EuiSearchBar,
} from '@elastic/eui';

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

export const SearchBar = () => {
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

  const toggleIncremental = () => {
    setIncremental((prev) => !prev);
  };

  const toggleHint = () => {
    setShowHint((prev) => !prev);
  };

  const renderSearch = () => {
    const schema = {
      strict: true,
      fields: {
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
          placeholder: 'type:visualization -is:active joe',
          incremental,
          schema,
        }}
        filters = {         
          [{
            type: 'field_value_selection',
            field: 'tag',
            name: 'Tag',
            multiSelect: 'or',
            operator: 'exact',
            cache: 10000, // will cache the loaded tags for 10 sec
            options: () => loadTags()
          }]
        }
        onChange={onChange}
        hint={
          showHint
            ? {
                content: (
                  <span>
                    Type search terms, e.g. <strong>visualization</strong> or{' '}
                    <strong>-dashboard</strong>
                  </span>
                ),
                popoverProps: { panelStyle: { backgroundColor: '#f7f8fc' } },
              }
            : undefined
        }
      />
    );
  };

  return (
    <Fragment>
      {renderSearch()}
    </Fragment>
  );
};

import { EuiSelect, EuiSearchBar, useGeneratedHtmlId } from "@elastic/eui";
import axios from "axios";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";

const options = [
  { value: 'option_one', text: 'Option one' },
  { value: 'option_two', text: 'Option two' },
  { value: 'option_three', text: 'Option three' },
];

const initialQuery = EuiSearchBar.Query.MATCH_ALL;

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState("");
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);
  const [incremental, setIncremental] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [value, setValue] = useState(options[1].value);

  const basicSelectId = useGeneratedHtmlId({ prefix: 'basicSelect' });

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onchange = ({ query, error }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      axios
        .get(
          `http://localhost:8983/solr/abstracts/select?q=title:${searchInput}`
        )
        .then((response) => {
          console.log(response);
          setResults(response.data.response.docs);
        });
    }
  }, [searchInput]);
  console.log(results);

  const renderSearch = () => {
    const schema = {
      strict: true,
      fields: {
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
      <>
        <EuiSearchBar
          defaultQuery={initialQuery}
          box={{
            placeholder: 'Search Something...',
            incremental,
            schema,
          }}
          onChange={onchange}
          hint={
            showHint
              ? {
                  content: (
                    <span>
                      Type search terms, e.g. <strong>visualization</strong> or{' '}
                      <strong>-dashboard</strong>
                    </span>
                  ),
                  popoverProps: { panelStyle: { backgroundColor: '#f7f8fc' } },
                }
              : undefined
          }
        />
        <EuiSelect
          id={basicSelectId}
          options={options}
          value={value}
          onChange={(e) => onChange(e)}
          aria-label="Use aria labels when no actual label is in use"
        />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {renderSearch()}
    </>
  );
}