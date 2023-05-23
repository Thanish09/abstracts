import SuggestDropdown from "@/components/SuggestDropdown";
import { EuiFlexItem } from "@elastic/eui";
import React from "react";

const test = () => {
  return (
    <EuiFlexItem grow={true} style={{ maxWidth: 700 }}>
      <SuggestDropdown />
    </EuiFlexItem>
  );
};

export default test;
