import { MutableRefObject, useEffect, useRef } from "react";

const TAB_KEY = "Tab";
const focusableElementsString =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

export default function useFocusHandler(
  //element containing the focusable elements
  containerRef: MutableRefObject<HTMLElement | null>
) {
  const focusableElementsRef = useRef<HTMLElement[]>([]);

  //init focusable elements
  useEffect(() => {
    focusableElementsRef.current = Array.from(
      containerRef.current?.nextElementSibling?.querySelectorAll(
        focusableElementsString
      ) || []
    );
    //focus first element if there's one
    if (focusableElementsRef.current.length >= 1) {
      focusableElementsRef.current[0].focus();
    }
  }, [containerRef]);

  // hook to trap focus within modal
  const handleKeyDown = (evt: KeyboardEvent) => {
    const numFocusableElements = focusableElementsRef.current.length;
    if (numFocusableElements <= 0) return;
    if (numFocusableElements <= 1) {
      focusableElementsRef.current[0].focus();
      return;
    }

    const firstTabStop = focusableElementsRef.current[0];
    const lastTabStop = focusableElementsRef.current[numFocusableElements - 1];

    // TAB
    if (evt.key === TAB_KEY) {
      // SHIFT + TAB
      if (evt.shiftKey) {
        if (document.activeElement === firstTabStop) {
          evt.preventDefault();
          lastTabStop.focus();
        }
      } else {
        if (document.activeElement === lastTabStop) {
          evt.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [containerRef]);
}
