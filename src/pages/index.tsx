import { EuiSelect, EuiSearchBar, useGeneratedHtmlId, EuiSpacer, EuiFlexGroup, EuiFlexItem, EuiText, EuiTextAlign, useEuiBackgroundColorCSS } from "@elastic/eui";
import axios from "axios";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import ResultsBox from "@/components/ResultsBox";

const options = [
  { value: '""', text: 'category' },
  { value: 'cs.AI', text: 'cs.AI' },
  { value: 'cs.AR', text: 'cs.AR' },
  { value: 'cs.CC', text: 'cs.CC' },
  { value: 'cs.CE', text: 'cs.CE' },
  { value: 'cs.CG', text: 'cs.CG' },
  { value: 'cs.CL', text: 'cs.CL' },
  { value: 'cs.CR', text: 'cs.CR' },
  { value: 'cs.CV', text: 'cs.CV' },
  { value: 'cs.CY', text: 'cs.CY' },
  { value: 'cs.DB', text: 'cs.DB' },
  { value: 'cs.DC', text: 'cs.DC' },
  { value: 'cs.DL', text: 'cs.DL' },
  { value: 'cs.DM', text: 'cs.DM' },
  { value: 'cs.DS', text: 'cs.DS' },
  { value: 'cs.ET', text: 'cs.ET' },
  { value: 'cs.FL', text: 'cs.FL' },
  { value: 'cs.GL', text: 'cs.GL' },
  { value: 'cs.GR', text: 'cs.GR' },
  { value: 'cs.GT', text: 'cs.GT' },
  { value: 'cs.HC', text: 'cs.HC' },
  { value: 'cs.IR', text: 'cs.IR' },
  { value: 'cs.IT', text: 'cs.IT' },
  { value: 'cs.LG', text: 'cs.LG' },
  { value: 'cs.LO', text: 'cs.LO' },
  { value: 'cs.MA', text: 'cs.MA' },
  { value: 'cs.MM', text: 'cs.MM' },
  { value: 'cs.MS', text: 'cs.MS' },
  { value: 'cs.NA', text: 'cs.NA' },
  { value: 'cs.NE', text: 'cs.NE' },
  { value: 'cs.NI', text: 'cs.NI' },
  { value: 'cs.OH', text: 'cs.OH' },
  { value: 'cs.OS', text: 'cs.OS' },
  { value: 'cs.PF', text: 'cs.PF' },
  { value: 'cs.PL', text: 'cs.PL' },
  { value: 'cs.RO', text: 'cs.RO' },
  { value: 'cs.SC', text: 'cs.SC' },
  { value: 'cs.SD', text: 'cs.SD' },
  { value: 'cs.SE', text: 'cs.SE' },
  { value: 'cs.SI', text: 'cs.SI' },
  { value: 'cs.SY', text: 'cs.SY' },
];

const initialQuery = EuiSearchBar.Query.MATCH_ALL;

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);
  const [incremental, setIncremental] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [value, setValue] = useState(options[0].value);

  const basicSelectId = useGeneratedHtmlId({ prefix: 'basicSelect' });
  const colorStyles = useEuiBackgroundColorCSS();
  const cssStyles = [colorStyles['accent']];

  const onChange = (e) => {
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
console.log(value);
  useEffect(() => {
    if (query.text.length > 0) {
      axios
        .get(
          `http://localhost:8983/solr/abstracts/select?q=title:${query.text} categories:${value}&q.op=AND&fl=title,abstract,authors,categories,score`
        )
        .then((response) => {
          setResults(response.data.response.docs);
        });
    }
  }, [query, value]);
  console.log(results);

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
        title: {
          type: 'string',
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
        onChange={onchange}
        query={query}
      />
    );
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
        <EuiFlexItem grow={true} style={{ maxWidth: 700 }}>{renderSearch()}</EuiFlexItem>
        <EuiSpacer />
        <EuiFlexItem grow={false}>
        <EuiSelect
          id={basicSelectId}
          options={options}
          value={value}
          onChange={(e) => onChange(e)}
          aria-label="Use aria labels when no actual label is in use"
        />
        </EuiFlexItem>
      </EuiFlexGroup>
      {results?.map((result, index) => (
        <ResultsBox
        key={index}
        title= {result.title}
        abstract={result.abstract}
        authors={result.authors}
        ></ResultsBox>
      ))}
    </>
  );
};
