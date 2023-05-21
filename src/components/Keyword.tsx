import { EuiBadge, EuiFlexItem } from "@elastic/eui";
import React, { MouseEventHandler } from "react";

const colors = ["primary", "accent", "success", "warning"];

type Props = {
  keyword: string;
  onClick: (e: MouseEventHandler<HTMLButtonElement>) => void;
  color: number;
};

const Keyword: React.FC<Props> = ({ keyword, onClick, color }) => {
  return (
    <EuiFlexItem grow={false}>
      <EuiBadge
        color={colors.find((_, idx) => idx === color) || "primary"}
        //@ts-ignore
        onClick={onClick}
        onClickAriaLabel="Keywords clicked"
      >
        {keyword}
      </EuiBadge>
    </EuiFlexItem>
  );
};

export default Keyword;
