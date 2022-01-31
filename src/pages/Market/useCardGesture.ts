import { MouseEvent, useRef, useState } from "react";

export default function useCardGesture(callback: Function) {
  const [down, setDown] = useState<Boolean>(false);
  const startRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [moved, setMoved] = useState(false);

  function handleMouseDown(e: MouseEvent) {
    if (!cardRef.current) {
      return;
    }
    setDown(true);
    startRef.current = e.pageX - cardRef.current.offsetLeft;
    scrollLeftRef.current = cardRef.current.scrollLeft;
  }

  function handleMouseLeave() {
    setDown(false);
    setMoved(false);
  }

  function handleMouseUp() {
    if (!down || moved) return;
    setDown(false);
    setMoved(false);
    callback && callback();
  }

  function handleMouseMove(e: MouseEvent) {
    e.preventDefault();
    if (!down) return;
    setMoved(true);
  }

  return {
    cardRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  };
}
