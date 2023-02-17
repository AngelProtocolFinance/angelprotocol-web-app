import { useEffect } from "react";

export default function useScrollTop(flag: string) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [flag]);
}
