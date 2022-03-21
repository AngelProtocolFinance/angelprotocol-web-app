import { MutableRefObject, useCallback, useEffect, useRef } from "react";

export default function useBackdropDismiss(callback: () => void) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismissHandler = (
    currentRef?: MutableRefObject<HTMLDivElement | undefined>
  ) => {
    if (currentRef) ref.current = currentRef?.current;
  };

  const handler = useCallback((event: any) => {
    const path = (event.path ||
      (event.composedPath && event.composedPath())) as any[];
    if (path.includes(ref.current)) return;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dismissHandler;
}
