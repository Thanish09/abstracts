import { EuiFacetGroup, EuiText } from "@elastic/eui";
import React from "react";
import FacetButton, { Props as FacetButtonProps } from ".";

export type FacetGroupProps = {
  facets: Pick<FacetButtonProps, "label" | "quantity">[];
  title: string;
  color: string;
};

const Group: React.FC<FacetGroupProps> = ({ facets, title, color }) => {
  return (
    <>
      <EuiText grow={false}>
        <h6>{title}</h6>
        <EuiFacetGroup style={{ maxWidth: 200 }}>
          {facets.map((facet) => (
            <FacetButton
              key={`${facet.label}-${facet.quantity}`}
              id={facet.label}
              iconColor={color}
              quantity={facet.quantity}
              label={facet.label}
            />
          ))}
        </EuiFacetGroup>
      </EuiText>
    </>
  );
};

export default Group;
