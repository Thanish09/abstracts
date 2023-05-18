import React from "react";
import ListItem, { Props as ListItemProps } from "./ListItem";
import SkeletonList from "../Skeletons/List";
import { EuiPanel, EuiSpacer } from "@elastic/eui";

type Props = {
  items: ListItemProps[];
  isLoading?: boolean;
};
const skeleton = [1, 2, 3, 4, 5, 6, 7];
const List: React.FC<Props> = ({ items, isLoading = false }) => {
  return (
    <>
      <EuiPanel grow={false}style={{backgroundColor: "transparent"}} hasShadow={false}>
        {isLoading
          ? skeleton.map((skl) => (
              <>
                <EuiSpacer />
                <SkeletonList />
              </>
            ))
          : items?.map((result, index) => (
              <>
                <EuiSpacer />

                <ListItem
                  key={index}
                  title={result.title}
                  abstract={result.abstract}
                  authors={result.authors}
                />
              </>
            ))}
        ;
      </EuiPanel>
    </>
  );
};

export default List;
