import React, { useRef, useState } from "react";

export default function useClickScroll() {
  const startRef = useRef<number>(0);
  const scrollLefRef = useRef<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { current: slider } = sliderRef;
  const [down, setDown] = useState<Boolean>(false);

  function handleMouseDown(e: React.MouseEvent) {
    console.log("mouse down");
    if (!slider) {
      return;
    }
    setDown(true);
    slider.classList.add("active");
    startRef.current = e.pageX - slider.offsetLeft;
    scrollLefRef.current = slider.scrollLeft;
  }

  function handleMouseLeave() {
    console.log("mouse leave");
    if (!slider) {
      return;
    }
    setDown(false);
    slider.classList.remove("active");
  }

  function handleMouseUp() {
    console.log("mouse up");
    if (!slider) {
      return;
    }
    setDown(false);
    slider.classList.remove("active");
  }

  function handleMouseMove(e: React.MouseEvent) {
    console.log("mouse move");
    if (!down || !slider) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startRef.current) * 3; //scroll-fast
    slider.scrollLeft = scrollLefRef.current - walk;
    console.log(walk);
  }

  return {
    ref: sliderRef,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove,
  };
}
