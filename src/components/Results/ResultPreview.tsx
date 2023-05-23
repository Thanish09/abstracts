import React, { useImperativeHandle, useState } from "react";
import {
  EuiBadge,
  EuiPanel,
  EuiBadgeGroup,
  EuiTitle,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiSkeletonText,
  EuiBetaBadge,
} from "@elastic/eui";
import { useMoreLikeThis } from "@/utils/queries";

type Props = {
  handleOpenMLT: (title: string) => void;
};

export type PreviewType = {
  id: string;
  title: string;
  abstract: string;
  authors: string;
  score: number;
};

type Ref = {
  onPreview: (p: PreviewType) => void;
  onReset: () => void;
};

const ResultPreview = React.forwardRef<Ref, Props>(({ handleOpenMLT }, ref) => {
  const [item, setItem] = useState<PreviewType | null>(null);
  const {
    data: mlts,
    isLoading: isMLTLoading,
    isError: isMLTError,
  } = useMoreLikeThis(item?.id || "");

  useImperativeHandle(
    ref,
    () => ({
      onPreview: (p) => setItem(p),
      onReset: () => setItem(null),
    }),
    []
  );

  return (
    <EuiPanel style={{ maxWidth: 300, width: 300 }} grow={false}>
      {item ? (
        <>
          {" "}
          <EuiTitle size="xs">
            <h3>{item.title}</h3>
          </EuiTitle>
          <EuiDescriptionList>
            <EuiDescriptionListDescription>
              {item.abstract}
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
          {mlts?.map((mlt) => (
            <EuiBetaBadge
              key={mlt.title}
              label={mlt.title}
              onClick={() => handleOpenMLT(mlt.title)}
            />
          ))}
        </>
      ) : (
        <EuiSkeletonText
          lines={5}
          size={"relative"}
          isLoading={true}
          contentAriaLabel="Demo skeleton text"
        />
      )}
    </EuiPanel>
  );
});

export default ResultPreview;
