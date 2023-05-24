import SuggestDropdown from "@/components/SuggestDropdown";
import { suggestWord } from "@/utils/api";
import { EuiFlexItem } from "@elastic/eui";
import React from "react";
import Turnstone from 'turnstone'

const styles = {
  input: 'border p-2 bg-white w-full',
  listbox: 'border p-2 bg-white w-full'
}

const test = () => {
  const listbox = {
    displayField: "name",
    data: async (query: any) => {
      console.log(query)
      const suggestWords = await suggestWord({ input: query });
      return (
        suggestWords?.[query]?.suggestions?.map((sw) => ({
          key: sw.term,
          value: sw.term,
        })) || []
      );
    },
  };
  return (
    <EuiFlexItem grow={true} style={{ maxWidth: 700 }}>
     <Turnstone id="autocomplete" listbox={listbox} styles={styles} typeahead={false} />
    </EuiFlexItem>
  );
};

export default test;
