import { useEffect } from "react";

export const useRendered = () => {
  useEffect(() => {
    (window as any).prerenderReady = true;
  }, []);
};
