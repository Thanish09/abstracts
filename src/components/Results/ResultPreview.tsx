import React from "react";
import { EuiBadge, EuiPanel, EuiBadgeGroup, EuiTitle, EuiDescriptionList, EuiDescriptionListDescription } from "@elastic/eui";

export type Props = {
  title: string;
  abstract: string;
  authors: string;
  score: number;
};

const ResultPreview: React.FC<Props> = ({title, abstract, authors, score}) => {
  return (
    <EuiPanel style={{ maxWidth: 300 }} grow={false}>
    <EuiTitle size="xs">
      <h3>{title}</h3>
    </EuiTitle>
    <EuiDescriptionList>
        <EuiDescriptionListDescription>
            {abstract}
        </EuiDescriptionListDescription>
    </EuiDescriptionList>
  </EuiPanel>
  );
};

export default ResultPreview;
