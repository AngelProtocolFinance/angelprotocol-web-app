import { useState } from "react";

export default function useSlider() {
  const [percentage, setPercentage] = useState(0);

  return {
    percentage,
    handleSlide: (value: number) => setPercentage(value),
    handleSlideEnd: (value: number) => setPercentage(value),
  };
}
