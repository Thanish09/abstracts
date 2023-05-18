import { EuiFacetButton, EuiIcon } from "@elastic/eui";
import React from "react";

export type Props = {
  id: string;
  quantity: number;
  isSelected?: boolean;
  label: string;
  iconColor: string;
};

const FacetButton: React.FC<Props> = ({
  id,
  quantity,
  isSelected = false,
  label,
  iconColor,
}) => {
  return (
    <EuiFacetButton
      id={id}
      quantity={quantity}
      icon={<EuiIcon type="dot" color={iconColor} />}
      isSelected={isSelected}
    >
      {label}
    </EuiFacetButton>
  );
};

export default FacetButton;
