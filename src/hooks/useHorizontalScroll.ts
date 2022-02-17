import delay from "helpers/delay";
import { useEffect, useRef, useState } from "react";

type NullibleNumber = number | null;

const easings = {
  // x = extra
  // t = current time or position
  // b = begin value
  // c = change or delta of value
  // d = duration / total time or position
  easeInCubic: (
    x: NullibleNumber,
    t: number,
    b: number,
    c: number,
    d: number
  ): number => {
    return c * (t /= d) * t * t + b;
  },
  easeInSine: function (
    x: NullibleNumber,
    t: number,
    b: number,
    c: number,
    d: number
  ) {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function (
    x: NullibleNumber,
    t: number,
    b: number,
    c: number,
    d: number
  ) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },
};

// type RefType = HTMLDivElement | HTMLUListElement;

type Props = {
  duration?: number;
};

export default function useHorizontalScroll(props?: Props) {
  const sliderRef = useRef<any>(null);
  const frameRef = useRef<number>(0);
  const [showBack, setShowBack] = useState(false);
  const [showForward, setShowForward] = useState(false);
  const duration = props?.duration || 1000;
  const DELAY = duration + 100;

  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);
    return () => {
      window.removeEventListener("resize", updateState);
      cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRef.current]);

  async function updateState() {
    await delay(DELAY);
    if (!sliderRef.current) return;
    setShowBack(sliderRef.current.scrollLeft > 20);
    const hasOverflow =
      sliderRef.current.scrollWidth > sliderRef.current.offsetWidth;
    const hasReachedScrollEnd =
      sliderRef.current.scrollWidth ===
      Math.floor(sliderRef.current.scrollLeft + sliderRef.current.offsetWidth);
    setShowForward(hasOverflow && !hasReachedScrollEnd);
  }

  const tween = function (
    start: number,
    end: number,
    duration: number,
    easing: (
      x: NullibleNumber,
      t: number,
      b: number,
      c: number,
      d: number
    ) => number
  ) {
    if (!sliderRef.current) return;
    var delta = end - start;

    let startTime: number;
    if (window.performance && !!window.performance.now) {
      startTime = performance.now();
    } else if (Date.now) {
      startTime = Date.now();
    } else {
      startTime = new Date().getTime();
    }
    let tweenLoop = function (time?: number) {
      if (!sliderRef.current) return;
      let t = !time ? 0 : time - startTime;
      let factor = easing(null, t, 0, 1, duration);
      sliderRef.current.scrollLeft = start + delta * factor;
      if (t < duration && sliderRef.current.scrollLeft !== end)
        return window.requestAnimationFrame(tweenLoop);
      cancelAnimationFrame(frameRef.current);
    };
    frameRef.current = requestAnimationFrame(tweenLoop);
  };

  function forward() {
    if (!sliderRef.current) return;
    const scrollFactor = Math.floor(sliderRef.current.offsetWidth * 0.4);
    const scrollLeft = sliderRef.current.scrollLeft;
    const scrollWidth = sliderRef.current.scrollWidth;
    const offsetWidth = sliderRef.current.offsetWidth;
    const end =
      scrollWidth - (scrollLeft + offsetWidth) > scrollFactor
        ? scrollLeft + scrollFactor
        : scrollWidth;
    tween(scrollLeft, end, duration, easings["easeOutSine"]);
    updateState();
  }

  function backward() {
    if (!sliderRef.current) return;
    const scrollFactor = Math.floor(sliderRef.current.offsetWidth * 0.4);
    const scrollLeft = sliderRef.current.scrollLeft;
    const end = Math.max(0, scrollLeft - scrollFactor);
    tween(scrollLeft, end, duration, easings["easeOutSine"]);
    updateState();
  }
  return {
    ref: sliderRef,
    forward,
    backward,
    showBack,
    showForward,
  };
}
