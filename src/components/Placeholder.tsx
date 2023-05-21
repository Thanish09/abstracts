import { EuiButton, EuiEmptyPrompt, EuiLink, EuiTitle } from "@elastic/eui";
import React from "react";

const Placeholder = () => {
  return (
    <EuiEmptyPrompt
      iconType="logoSecurity"
      body={<p>Add a new search or change your filter settings.</p>}
      footer={
        <>
          <EuiTitle size="xxs">
            <h3>Want to learn more?</h3>
          </EuiTitle>
          <EuiLink href="#" target="_blank">
            Read the docs
          </EuiLink>
        </>
      }
    />
  );
};

export default Placeholder;
