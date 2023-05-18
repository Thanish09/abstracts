import React from "react";
import {
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiCard,
  EuiSpacer,
  EuiFlexItem,
  EuiFlexGroup,
} from "@elastic/eui";

export type Props = {
  title: string;
  abstract: string;
  authors: string;
};

const ListItem: React.FC<Props> = ({ title, abstract, authors }) => {
  return (
    <EuiFlexGroup justifyContent="spaceAround">
      <EuiFlexItem style={{ maxWidth: 700 }}>
        <EuiCard textAlign="center" title="">
          <EuiDescriptionList>
            <EuiDescriptionListTitle>{title}</EuiDescriptionListTitle>
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
    </EuiFlexGroup>
  );
};

export default ListItem;
