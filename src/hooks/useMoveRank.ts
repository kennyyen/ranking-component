import { RefObject, useLayoutEffect, useRef } from "react";

export const useMoveRank = (listRef: RefObject<HTMLElement>) => {
  type Rect = Pick<DOMRect, "top">;
  const origins = useRef<{ [key: string]: DOMRect }>({});
  let firstRun = useRef(true);

  const getDelta = (start: Rect, target: Rect) => ({
    top: start.top - target.top,
  });
  const invert = (delta: Rect, elem: HTMLElement) => {
    elem.style.transform = `translate(0px, ${delta.top}px)`;
    elem.style.transition = `transform 0s`;
  };
  const play = (elem: HTMLElement) => {
    elem.style.transform = "";
    elem.style.transition = `transform 300ms ease`;
  };

  const isZero = (delta: Rect) => delta.top === 0;
  useLayoutEffect(() => {
    if (listRef.current === null) return;
    const list = listRef.current;
    const children: HTMLElement[] = [].slice.call(list.children);

    for (const child of children) {
      const key = child.dataset.key!;

      const next = child.getBoundingClientRect();
      if (!firstRun.current) {
        if (key in origins.current) {
          const previous = origins.current[key];
          const delta = getDelta(previous, next);
          if (!isZero(delta)) {
            invert(delta, child);

            requestAnimationFrame(() => {
              play(child);
            });
          }
        }
      }
      origins.current[child.dataset.key!] = next;
    }

    firstRun.current = false;
  }, [listRef]);
};
