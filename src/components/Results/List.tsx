import React from "react";
import ListItem, { Props as ListItemProps } from "./ListItem";
import { EuiSpacer } from "@elastic/eui";

type Props = {
  items: ListItemProps[];
};

const List: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items?.map((result, index) => (
        <>
          <EuiSpacer />
          <ListItem
            key={index}
            title={result.title}
            abstract={result.abstract}
            authors={result.authors}
            score={result.score}
          />
        </>
      ))}
      ;
    </>
  );
};

export default List;
