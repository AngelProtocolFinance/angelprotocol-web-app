import useKeyPress from "hooks/useKeyPress";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Handlers, Opener, Props } from "./types";

const TAB_KEY = "Tab";
const focusableElementsString =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

export default function Modal(props: Props) {
  const [Content, setContent] = useState<ReactNode>();
  const ref = useRef<HTMLDivElement>();
  const [backdropDismiss, setBackdropDismiss] = useState(true);
  const escKeyPressed = useKeyPress("Escape");

  // hook to trap focus within modal
  const focusHandler = useCallback(
    (evt?: KeyboardEvent) => {
      const focusableElements = Array.from(
        ref?.current?.querySelectorAll(focusableElementsString) || []
      );

      const firstTabStop = focusableElements[0] as HTMLElement;
      const lastTabStop = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (focusableElements.length === 0) return;

      if (!evt) {
        firstTabStop.focus();
        return;
      }

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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref?.current]
  );

  const showModal: Opener = (Content, props) => {
    setBackdropDismiss(props.isDismissDisabled ?? true);
    setContent(<Content {...props} />);
    focusHandler();
  };

  function closeModal() {
    setContent(undefined);
    setBackdropDismiss(true);
    ref.current = undefined;
  }

  const dismissModal = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath());

    if (path[0] === ref.current) {
      closeModal();
    }
  };

  useEffect(() => {
    if (escKeyPressed) {
      closeModal();
    }
  }, [escKeyPressed]);

  useEffect(() => {
    return () => ref.current?.removeEventListener("click", dismissModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRef = useCallback(
    (node) => {
      if (node !== null && backdropDismiss) {
        ref.current = node;
        ref.current?.addEventListener("click", dismissModal);
        window.addEventListener("keydown", focusHandler);
        focusHandler();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [backdropDismiss, Content]
  );

  return (
    <setContext.Provider
      value={{
        showModal,
        hideModal: closeModal,
      }}
    >
      {!!Content && (
        <>
          <div ref={handleRef} className={props.classes}>
            {Content}
          </div>
        </>
      )}

      {props.children}
    </setContext.Provider>
  );
}
const setContext = createContext<Handlers>({
  showModal: () => {},
  hideModal: () => {},
});

export const useSetModal = () => useContext(setContext);
