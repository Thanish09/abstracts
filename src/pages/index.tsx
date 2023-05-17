import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { EuiSearchBar } from "@elastic/eui";
const initialQuery = EuiSearchBar.Query.MATCH_ALL;
export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState("");
  const [incremental, setIncremental] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
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
  const tags = [
    { name: "marketing", color: "danger" },
    { name: "finance", color: "success" },
    { name: "eng", color: "success" },
    { name: "sales", color: "warning" },
    { name: "ga", color: "success" },
  ];
  const schema = {
    strict: true,
    fields: {
      type: {
        type: "string",
      },
      active: {
        type: "boolean",
      },
      status: {
        type: "string",
      },
      followers: {
        type: "number",
      },
      comments: {
        type: "number",
      },
      stars: {
        type: "number",
      },
      created: {
        type: "date",
      },
      owner: {
        type: "string",
      },
      tag: {
        type: "string",
        validate: (value) => {
          if (value !== "" && !tags.some((tag) => tag.name === value)) {
            throw new Error(
              `unknown tag (possible values: ${tags
                .map((tag) => tag.name)
                .join(",")})`
            );
          }
        },
      },
    },
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <EuiSearchBar
        defaultQuery={initialQuery}
        box={{
          placeholder: "type:visualization -is:active joe",
          incremental,
          schema,
        }}
      />
    </>
  );
}
