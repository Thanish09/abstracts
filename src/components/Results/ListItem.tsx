import React from "react";
import {
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiCard,
  EuiSpacer,
  EuiFlexItem,
  EuiFlexGroup,
  EuiAvatar,
} from "@elastic/eui";

export type Props = {
  title: string;
  abstract: string;
  authors: string;
  score: number;
};

const ListItem: React.FC<Props> = ({ title, abstract, authors, score }) => {
  return (
    <EuiFlexGroup justifyContent="spaceAround">
      <EuiFlexItem style={{ maxWidth: 700 }}>
        <EuiCard 
          textAlign="left"
          title={title}
          betaBadgeProps={{
            css: {transform: "translateX(250%) translateY(2%)"},
            color: "accent",
            label: `Score: ${score.toFixed(3)}`,
          }}
          onClick={() => {}}
        >
          <EuiDescriptionList>
            <EuiDescriptionListDescription>
              {abstract[0].substring(0, 200) + "..."}
            </EuiDescriptionListDescription>
            <EuiSpacer />
            <EuiDescriptionListDescription>
              <EuiFlexGroup gutterSize="s" alignItems="center">
                  {authors[0].split(',').map((author, index) => (
                    <EuiFlexItem grow={false} key={index}>
                      <EuiAvatar size="m" name={author} />
                    </EuiFlexItem>
                  ))}
              </EuiFlexGroup>
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
        </EuiCard>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default ListItem;
