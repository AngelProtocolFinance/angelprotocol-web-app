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
import useFocusHandler from "./useFocusHandler";

export default function Modal(props: Props) {
  const [Content, setContent] = useState<ReactNode>();
  const ref = useRef<HTMLDivElement>();
  // pointer to last active dom element
  const lastActive = useRef<HTMLElement>();
  const [backdropDismiss, setBackdropDismiss] = useState(true);
  const escKeyPressed = useKeyPress("Escape");
  const focusHandler = useFocusHandler();

  const showModal: Opener = (Content, props) => {
    setBackdropDismiss(props.isDismissDisabled ?? true);
    setContent(<Content {...props} />);

    // track last active element
    lastActive.current = document.activeElement as HTMLElement;
    focusHandler();
  };

  function closeModal() {
    setContent(undefined);
    setBackdropDismiss(true);
    ref.current = undefined;

    // return focus to last active dom element
    lastActive.current?.focus();
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
        focusHandler(ref);
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
          <div role="alertdialog" ref={handleRef} className={props.classes}>
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
