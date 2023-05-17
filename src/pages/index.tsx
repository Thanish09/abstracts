import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState("");

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
    </>
  );
}
