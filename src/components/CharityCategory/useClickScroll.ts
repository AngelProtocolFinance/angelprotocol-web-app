import React, { useRef, useState } from "react";

export default function useClickScroll() {
  const [down, setDown] = useState<Boolean>(false);
  const startRef = useRef<number>(0);
  const scrollLefRef = useRef<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  function handleMouseDown(e: React.MouseEvent) {
    if (!sliderRef.current) {
      return;
    }

    setDown(true);
    startRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLefRef.current = sliderRef.current.scrollLeft;
  }

  function handleMouseLeave() {
    setDown(false);
  }

  function handleMouseUp() {
    setDown(false);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!down || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startRef.current) * 3; //scroll-fast
    sliderRef.current.scrollLeft = scrollLefRef.current - walk;
  }

  return {
    isDown: down,
    ref: sliderRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  };
}
