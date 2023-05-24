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
  EuiSpacer,
  EuiAvatar,
  EuiListGroupItem,
  EuiListGroup,
  EuiFormRow,
  EuiFieldText,
  EuiCopy,
  EuiButton,
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
  license: string;
  doi: string;
};

type Ref = {
  onPreview: (p: PreviewType) => void;
  onReset: () => void;
};

const ResultPreview = React.forwardRef<Ref, Props>(({ handleOpenMLT }, ref) => {
  const [item, setItem] = useState<PreviewType | null>(null);
  const [copyText, setCopyText] = useState(item?.doi || "");
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
          {setCopyText(item.doi)}
          <EuiTitle size="xs">
            <h3>{item.title}</h3>
          </EuiTitle>
          <EuiBadge color="warning">{item.license}</EuiBadge>
          <EuiSpacer size="s" />
          <EuiDescriptionList>
            <EuiDescriptionListDescription style={{border:'thick'}}>
              {item.abstract}
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
          <EuiSpacer size="s" />
          {item.authors.split(/\s+and\s+|,\s*/).map((author, index) => (
            <EuiListGroup flush={true} bordered={true}>
              <EuiAvatar size="m" name={author} />
              <EuiListGroupItem label={author} />
            </EuiListGroup>
          ))}
          <EuiSpacer size="s" />
          <EuiFormRow>
            <EuiFieldText value={copyText} />
          </EuiFormRow>
          <EuiSpacer size="m" />
          <EuiCopy textToCopy={copyText}>
            {(copy) => (
              <EuiButton onClick={copy}>Copy Doi</EuiButton>
            )}
          </EuiCopy>
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
