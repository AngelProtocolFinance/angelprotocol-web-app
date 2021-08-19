import React, { useRef, useState } from "react";

export default function useClickScroll() {
  const startRef = useRef<number>(0);
  const scrollLefRef = useRef<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { current: slider } = sliderRef;
  const [down, setDown] = useState<Boolean>(false);

  function handleMouseDown(e: React.MouseEvent) {
    if (!slider) {
      return;
    }
    setDown(true);
    startRef.current = e.pageX - slider.offsetLeft;
    scrollLefRef.current = slider.scrollLeft;
  }

  function handleMouseLeave() {
    setDown(false);
  }

  function handleMouseUp() {
    setDown(false);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!down || !slider) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startRef.current) * 3; //scroll-fast
    slider.scrollLeft = scrollLefRef.current - walk;
  }

  return {
    ref: sliderRef,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove,
    isDown: down,
  };
}
