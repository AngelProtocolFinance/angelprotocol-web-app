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

export default function Nodal({ backdropDismiss = true, ...props }: Props) {
  const [Content, setContent] = useState<ReactNode>();
  const ref = useRef<HTMLDivElement>();

  const showModal: Opener = (Content, props) => {
    setContent(<Content {...props} />);
  };

  function closeModal() {
    setContent(undefined);
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

  const handleRef = useCallback((node) => {
    if (node !== null && backdropDismiss) {
      ref.current = node;
      ref.current?.addEventListener("click", dismissModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
