import {
  EuiFacetGroup,
  EuiPanel,
  EuiSkeletonText,
  EuiText,
} from "@elastic/eui";
import React from "react";
import FacetButton, { Props as FacetButtonProps } from ".";

export type FacetGroupProps = {
  facets: Pick<FacetButtonProps, "label" | "quantity">[];
  title: string;
  color: string;
  onClick: (e: string) => void;
  isLoading?: boolean;
  selectedList: string[];
};

const Group: React.FC<FacetGroupProps> = ({
  facets,
  title,
  color,
  onClick,
  selectedList,
  isLoading = false,
}) => {
  return (
    <EuiPanel grow={false} style={{ maxWidth: 300 }}>
      <EuiText grow={false}>
        <h6>{title}</h6>
        <div
          tabIndex={0}
          role="region"
          aria-label=""
          className="eui-yScrollWithShadows"
          style={{ maxHeight: 300 }}
        >
          {isLoading ? (
            <EuiSkeletonText
              lines={5}
              size={"relative"}
              isLoading={true}
              contentAriaLabel="Demo skeleton text"
            />
          ) : (
            <EuiFacetGroup style={{ maxWidth: 300 }}>
              {facets.map((facet) => (
                <FacetButton
                  key={`${facet.label}-${facet.quantity}`}
                  id={facet.label}
                  iconColor={color}
                  quantity={facet.quantity}
                  label={facet.label}
                  onClick={onClick}
                  isSelected={!!selectedList.find((sL) => sL === facet.label)}
                />
              ))}
            </EuiFacetGroup>
          )}
        </div>
      </EuiText>
    </EuiPanel>
  );
};

export default Group;
