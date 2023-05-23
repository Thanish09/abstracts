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
    <EuiFlexItem style={{ maxWidth: 700 }} grow={false}>
      <EuiCard
        textAlign="left"
        title={title}
        betaBadgeProps={{
          css: { transform: "translateX(170%) translateY(2%)" },
          color: "accent",
          label: `Match ${score.toFixed(3)}`,
        }}
        onClick={() => {}}
      >
        <EuiDescriptionList>
          <EuiDescriptionListDescription>
            {abstract.substring(0, 200) + "..."}
          </EuiDescriptionListDescription>
          <EuiSpacer />
          <EuiDescriptionListDescription>
            <EuiFlexGroup gutterSize="s" alignItems="center">
              {authors.split(/\s+and\s+|,\s*/).map((author, index) => (
                <EuiFlexItem grow={false} key={index}>
                  <EuiAvatar size="m" name={author} />
                </EuiFlexItem>
              ))}
               
            </EuiFlexGroup>
          </EuiDescriptionListDescription>
        </EuiDescriptionList>
      </EuiCard>
    </EuiFlexItem>
  );
};

export default ListItem;
