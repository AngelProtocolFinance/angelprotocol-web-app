import useDebouncer from "hooks/useDebouncer";
import { MouseEvent, useRef, useState } from "react";

export default function useCardGesture(callback: Function) {
  const [down, setDown] = useState<Boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [moved, setMoved] = useState(false);

  const debounceMoved = useDebouncer<boolean>(moved, 150);

  function handleMouseDown(e: MouseEvent) {
    if (!cardRef.current) {
      return;
    }
    setDown(true);
  }

  function handleMouseLeave() {
    setDown(false);
    setMoved(false);
  }

  function handleMouseUp() {
    if (!down) return;
    setDown(false);
    setMoved(false);
    if (debounceMoved) return;
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
