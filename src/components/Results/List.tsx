import React from "react";
import ListItem, { Props as ListItemProps } from "./ListItem";
import SkeletonList from "../Skeletons/List";
import { EuiPanel, EuiSpacer } from "@elastic/eui";
import { PreviewType } from "./ResultPreview";

type Props = {
  items: ListItemProps[];
  isLoading?: boolean;
  handlePreview: (p: PreviewType) => void;
};
const skeleton = [1, 2, 3, 4, 5, 6, 7];
const List: React.FC<Props> = ({ items, handlePreview, isLoading = false }) => {
  return (
    <>
      <EuiPanel
        grow={false}
        style={{ backgroundColor: "transparent" }}
        hasShadow={false}
      >
        {isLoading
          ? skeleton.map((skl) => (
              <div key={skl.toString()}>
                <EuiSpacer style={{ maxWidth: 300 }} />
                <SkeletonList />
              </div>
            ))
          : items?.map((result, index) => (
              <div key={result.id}>
                <ListItem
                  key={result.id}
                  id={result.id}
                  title={result.title}
                  abstract={result.abstract}
                  authors={result.authors}
                  score={result.score}
                  handlePreview={handlePreview}
                />
                <EuiSpacer style={{ maxWidth: 300 }} />
              </div>
            ))}
      </EuiPanel>
    </>
  );
};

export default List;
