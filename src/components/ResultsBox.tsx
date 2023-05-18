import React from 'react';
import {
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiCard,
  EuiSpacer,
  EuiFlexItem,
  EuiFlexGroup,
} from '@elastic/eui';
import { JUSTIFY_CONTENTS } from '@elastic/eui/src/components/flex/flex_group';

export default ({title, abstract, authors}) => (
  <>
    <EuiSpacer />
    <EuiFlexGroup justifyContent="spaceAround">
      <EuiFlexItem style={{maxWidth: 700}}>
        <EuiCard textAlign="center">
          <EuiDescriptionList>
            <EuiDescriptionListTitle>
              {title}
            </EuiDescriptionListTitle>
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
  </>
);