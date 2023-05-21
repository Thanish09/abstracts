import React from "react";
import { EuiBadge, EuiPanel, EuiBadgeGroup, EuiTitle } from "@elastic/eui";

export default () => (
  <EuiPanel style={{ maxWidth: 300 }} grow={false}>
    <EuiTitle size="xs">
      <h3>Related searches</h3>
    </EuiTitle>
    <EuiBadgeGroup gutterSize="s" style={{ marginTop: "1rem" }}>
      <EuiBadge
        color="success"
        onClick={() => {}}
        onClickAriaLabel="Click this badge to..."
      >
        Badge with onClick being truncated
      </EuiBadge>
      <EuiBadge
        color="success"
        onClick={() => {}}
        onClickAriaLabel="Click this badge to..."
      >
        Badge with onClick being truncated
      </EuiBadge>
      <EuiBadge
        color="success"
        onClick={() => {}}
        onClickAriaLabel="Click this badge to..."
      >
        Badge with onClick being truncated
      </EuiBadge>
      <EuiBadge
        color="success"
        onClick={() => {}}
        onClickAriaLabel="Click this badge to..."
      >
        Badge with onClick being truncated
      </EuiBadge>
      <EuiBadge
        color="success"
        onClick={() => {}}
        onClickAriaLabel="Click this badge to..."
      >
        Badge with onClick being truncated
      </EuiBadge>
    </EuiBadgeGroup>
  </EuiPanel>
);
