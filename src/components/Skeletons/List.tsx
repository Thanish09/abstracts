import { EuiCard, EuiFlexItem, EuiSkeletonText } from "@elastic/eui";
import React from "react";

const List = () => {
  return (
    <EuiFlexItem style={{ maxWidth: 700 }}>
      <EuiCard textAlign="center" title="">
        <EuiSkeletonText
          lines={3}
          size={"relative"}
          isLoading={true}
          contentAriaLabel="Demo skeleton text"
        />
      </EuiCard>
    </EuiFlexItem>
  );
};

export default List;
