import { useEffect } from "react";

export default function useScrollTop(flag: string) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: self-explanatory
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [flag]);
}
