import { Children, useEffect, useLayoutEffect, useState } from "react";
import calculateBoundingEntries from "../../../helers/calculateBoudingEntries";
import usePrevious from "../../../hooks/usePrevious";

type Props = {
  children: any;
};
type EntryType = { bottom: any };

const AnimatedStreamer: React.FC<Props> = ({ children }: Props) => {
  const [boundingEntry, setBoundingEntry] = useState({});
  const [prevBoundingEntry, setPrevBoundingEntry] = useState({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const newBoundingEntry = calculateBoundingEntries(children);
    setBoundingEntry(newBoundingEntry);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingEntry = calculateBoundingEntries(prevChildren);
    setPrevBoundingEntry(prevBoundingEntry);
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevBoundingEntry = Object.keys(prevBoundingEntry).length;

    if (hasPrevBoundingEntry) {
      Children.forEach(children, (child: any) => {
        const domNode = child.ref.current;
        const firstEntry: EntryType =
          prevBoundingEntry[child.key as keyof typeof prevBoundingEntry];
        const lastEntry: EntryType =
          boundingEntry[child.key as keyof typeof boundingEntry];
        const changeIndex = firstEntry.bottom - lastEntry.bottom;
        console.log("changeIndex ", changeIndex);
        if (changeIndex) {
          console.log("changeIndex ", true);
          requestAnimationFrame(() => {
            console.log("HOW MANY TIMES ?", domNode.style.transform);
            // Before DOM paints, invert child to old position
            domNode.style.transform = `translateY(${changeIndex}px)`;
            domNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
              // After the previous frame, remove the transition to play the animation
              domNode.style.transform = "";
              domNode.style.transition = "all 0.3s ease 0s";
            });
          });
        }
      });
    }
  }, [boundingEntry, prevBoundingEntry, children]);
  return children;
};

export default AnimatedStreamer;
