import { useEffect, useRef } from "react";
type paramsTypes = {
  nextAnimationFrameHandler: any;
  // we still want to have "infinite" animations in some cases
  duration: number;
  shouldAnimate: boolean;
};
export const useAnimationFrame = ({
  nextAnimationFrameHandler,
  // we still want to have "infinite" animations in some cases
  duration = Number.POSITIVE_INFINITY,
  shouldAnimate = true,
}: paramsTypes) => {
  const frame = useRef(0);
  // keep track of when animation is started
  const firstFrameTime = useRef(performance.now());

  const animate = (now: number) => {
    // calculate at what time fraction we are currently of whole time of animation
    let timeFraction = (now - firstFrameTime.current) / duration;
    // console.log(timeFraction, now, firstFrameTime.current, frame.current);
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    if (timeFraction <= 1) {
      nextAnimationFrameHandler(timeFraction);
      // request next frame only in cases when we not reached 100% of duration
      if (timeFraction === 1) {
        firstFrameTime.current = performance.now();
      }
      frame.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    console.log("shouldAnimate: ", shouldAnimate);
    if (shouldAnimate) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame.current);
    }
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAnimate]);
};
