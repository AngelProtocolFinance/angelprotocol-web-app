import { useState, FC } from "react";

export default function useTooltip(tooltip: FC) {
  const [hovered, setHovered] = useState(false);

  const enter = () => {
    setHovered(true);
  };
  const exit = () => {
    setHovered(false);
  };
  //when hover is not available
  const handleClick = () => {
    setHovered((prev) => !prev);
  };

  return {
    enter,
    exit,
    handleClick,
    _Tooltip: hovered ? tooltip : () => null,
  };
}
