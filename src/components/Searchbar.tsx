import { suggestWord } from "@/utils/api";
import React, { useImperativeHandle, useState } from "react";
// @ts-ignore
import Turnstone from "turnstone";
import styles from "./Searchbar.module.css"; // Import the CSS module

type Props = {
  handleSearch: (key: string) => void;
};

type Ref = {
  onAddItem: (s: string) => void;
};

const Searchbar = React.forwardRef<Ref, Props>(({ handleSearch }, ref) => {
  const [searchText, setSearchText] = useState("");
  const listbox = {
    displayField: "name",
    data: async (query: any) => {
      const suggestWords = await suggestWord({ input: query });
      return (
        suggestWords?.[query]?.suggestions?.map((sw) => ({
          key: sw.term,
          value: sw.term,
        })) || []
      );
    },
  };

  useImperativeHandle(
    ref,
    () => ({
      onAddItem: (s) => setSearchText(s),
    }),
    []
  );

  return (
    <Turnstone
      id="autocomplete"
      text={searchText}
      listbox={listbox}
      placeholder="Search something..."
      noItemsMessage="We found no places that match your search"
      styles={styles}
      typeahead={false}
      clearButton={true}
      debounceWait={250}
      onChange={searchText}
      onEnter={(e: string) => handleSearch(e)}
    />
  );
});

export default Searchbar;
