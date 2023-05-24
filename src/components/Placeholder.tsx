import { EuiButton, EuiEmptyPrompt, EuiLink, EuiTitle } from "@elastic/eui";
import React from "react";
import Lottie from "lottie-react";

import DOT from "../assets/dot.json"

const Placeholder = () => {
  return (
    <EuiEmptyPrompt
      icon={<Lottie style={{ height: 100 }} animationData={DOT} loop={true} />}
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
