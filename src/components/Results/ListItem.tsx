import React from "react";
import {
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiCard,
  EuiSpacer,
  EuiFlexItem,
  EuiFlexGroup,
  EuiAvatar,
  EuiPanel,
} from "@elastic/eui";

export type Props = {
  title: string;
  abstract: string;
  authors: string;
  score: number;
};

const ListItem: React.FC<Props> = ({ title, abstract, authors, score }) => {
  return (
    <EuiFlexItem style={{ maxWidth: 700 }}>
      <EuiCard
        textAlign="left"
        title={title}
        betaBadgeProps={{
          css: { transform: "translateX(250%) translateY(2%)" },
          color: "accent",
          label: `Match ${score.toFixed(3)}`,
        }}
        onClick={() => {}}
      >
        <EuiDescriptionList>
          <EuiDescriptionListDescription>
            {abstract[0].substring(0, 200) + "..."}
          </EuiDescriptionListDescription>
          <EuiSpacer />
          <EuiDescriptionListDescription>
            {authors}
          </EuiDescriptionListDescription>
        </EuiDescriptionList>
      </EuiCard>
    </EuiFlexItem>
  );
};

export default ListItem;
