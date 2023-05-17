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

export default function Home() {
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
        filters = {filters}
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
