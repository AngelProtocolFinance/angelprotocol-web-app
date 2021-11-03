import { useState } from "react";

export default function useTooltip(isPresent: boolean) {
  const [hovered, setHovered] = useState(false);
  const handleEnter = () => {
    isPresent && setHovered(true);
  };
  const handleExit = () => {
    isPresent && setHovered(false);
  };

  //when hover is not available
  const handleClick = () => {
    isPresent && setHovered((prev) => !prev);
  };

  return { hovered, handleEnter, handleExit, handleClick };
}
