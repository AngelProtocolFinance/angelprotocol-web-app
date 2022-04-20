import { MutableRefObject, useEffect } from "react";

export default function useAttachDivClickhandler(
  divRef: MutableRefObject<HTMLDivElement | null>,
  handler: () => void,
  isSkipAttach?: boolean
) {
  //usable if div encloses other clickable elements
  //if div is adjacent, better use onClick directly to div
  function handleDivClick(evt: MouseEvent) {
    const path = evt.composedPath();
    if (path[0] === divRef.current) {
      handler();
    }
  }
  useEffect(() => {
    const divNode = divRef.current;
    if (!isSkipAttach) {
      divNode?.addEventListener("click", handleDivClick);
    }
    return () => {
      divNode?.removeEventListener("click", handleDivClick);
    };
    //eslint-disable-next-line
  }, []);
}
