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

export default function Modal(props: Props) {
  const [Content, setContent] = useState<ReactNode>();
  const ref = useRef<HTMLDivElement>();
  const [backdropDismiss, setBackdropDismiss] = useState(true);

  const showModal: Opener = (Content, props) => {
    setBackdropDismiss(props.backdropDismiss ?? true);
    setContent(<Content {...props} />);
  };

  function closeModal() {
    setContent(undefined);
    setBackdropDismiss(true);
  }

  const dismissModal = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath());

    if (path[0] === ref.current) {
      closeModal();
    }
  };

  useEffect(() => {
    return () => ref.current?.removeEventListener("click", dismissModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRef = useCallback(
    (node) => {
      if (node !== null && backdropDismiss) {
        ref.current = node;
        ref.current?.addEventListener("click", dismissModal);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [backdropDismiss]
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
