import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import Backdrop from "../Backdrop/Backdrop";
import { Handlers, Opener } from "./types";

export default function ModalContext(
  props: PropsWithChildren<{ backdropClasses: string }>
) {
  const [Modal, setModal] = useState<ReactNode>();
  const lastActiveElRef = useRef<HTMLElement>();

  const showModal: Opener = useCallback((Modal, props) => {
    setModal(<Modal {...props} />);
    // track last active element
    lastActiveElRef.current = document.activeElement as HTMLElement;
  }, []);

  const closeModal = useCallback(() => {
    setModal(undefined);
    // pointer to last active dom element
    lastActiveElRef.current?.focus();
  }, []);

  return (
    <setContext.Provider
      value={{
        showModal,
        closeModal,
      }}
    >
      {!!Modal && (
        <>
          <Backdrop classes={props.backdropClasses} />
          {Modal}
        </>
      )}

      {props.children}
    </setContext.Provider>
  );
}
const setContext = createContext<Handlers>({
  showModal: () => {},
  closeModal: () => {},
});
export const useModalContext = () => useContext(setContext);
