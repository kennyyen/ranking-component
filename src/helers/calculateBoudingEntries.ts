import { Children } from "react";

type boundingEntriesType = {
  key?: any;
};

const calculateBoundingEntries = (children: any) => {
  const boundingEntries: boundingEntriesType = {};

  Children.forEach(children, (child) => {
    const domNode = child.ref.current;
    const nodeBoundingEntry = domNode.getBoundingClientRect();

    boundingEntries[child.key as keyof typeof boundingEntries] =
      nodeBoundingEntry;
  });

  return boundingEntries;
};

export default calculateBoundingEntries;
