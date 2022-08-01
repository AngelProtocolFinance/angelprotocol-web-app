import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { FC } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../components/Backdrop";

type Handler = () => void;
type Opener = <T = {}>(
  Content: FC<T>,
  props: T,
  parentId?: string,
  canBeClosed?: boolean
) => void;
type Handlers = {
  showModal: Opener;
  closeModal: Handler;
};
export default function ModalContext(
  props: PropsWithChildren<{ backdropClasses: string; id?: string }>
) {
  const [parentId, setParentId] = useState<string>();
  const [Modal, setModal] = useState<ReactNode>();
  const [isClosable, setClosable] = useState<boolean>(true);
  const lastActiveElRef = useRef<HTMLElement>();

  const showModal: Opener = useCallback(
    (Modal, props, parentId, canBeClosed = true) => {
      if (parentId) setParentId(parentId);
      setModal(<Modal {...props} />);
      setClosable(canBeClosed);
      // track last active element
      lastActiveElRef.current = document.activeElement as HTMLElement;
    },
    []
  );

  const closeModal = useCallback(() => {
    if (!isClosable) {
      return;
    }
    setModal(undefined);
    setParentId(undefined);
    // pointer to last active dom element
    lastActiveElRef.current?.focus();
  }, [isClosable]);

  const Content = !!Modal && (
    <>
      <Backdrop classes={props.backdropClasses} canBeClosed={isClosable} />
      {Modal}
    </>
  );

  return (
    <setContext.Provider
      value={{
        showModal,
        closeModal,
      }}
    >
      {parentId
        ? createPortal(Content, document.getElementById(parentId)!)
        : Content}
      {props.children}
    </setContext.Provider>
  );
}
const setContext = createContext<Handlers>({
  showModal: () => {},
  closeModal: () => {},
});
export const useModalContext = () => useContext(setContext);
