import React from 'react';
import {
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '@elastic/eui';

export default ({title, abstract, authors}) => (
  <EuiDescriptionList>
    <EuiDescriptionListTitle>
      {title}
    </EuiDescriptionListTitle>
    <EuiDescriptionListDescription>
      {abstract}
    </EuiDescriptionListDescription>
    <EuiDescriptionListDescription>
      {authors}
    </EuiDescriptionListDescription>
  </EuiDescriptionList>
);