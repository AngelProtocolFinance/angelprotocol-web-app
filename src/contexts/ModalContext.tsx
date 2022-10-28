import { Dialog } from "@headlessui/react";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { FC } from "react";

type Handler = () => void;
type Opener = <T = {}>(Content: FC<T>, props: T) => void;
type Handlers = {
  showModal: Opener;
  closeModal: Handler;
  onCloseModal: (func: Handler) => void;
};

export default function ModalContext(
  props: PropsWithChildren<{ backdropClasses: string; id?: string }>
) {
  const [Modal, setModal] = useState<ReactNode>();
  const [onClose, setOnClose] = useState<Handler>();

  const showModal: Opener = useCallback((Modal, props) => {
    setModal(<Modal {...props} />);
    // track last active element
  }, []);

  const closeModal = useCallback(() => {
    setModal(undefined);
    if (onClose) {
      onClose();
      setOnClose(undefined);
    }
  }, [onClose]);

  const onCloseModal = useCallback(
    (func: Handler) => setOnClose(() => func),
    []
  );

  return (
    <setContext.Provider
      value={{
        showModal,
        closeModal,
        onCloseModal,
      }}
    >
      <Dialog
        open={Modal !== undefined}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className={props.backdropClasses} aria-hidden="true" />
        {Modal /** should always be wrapped with Dialog.Panel */}
      </Dialog>

      {props.children}
    </setContext.Provider>
  );
}
const setContext = createContext<Handlers>({} as Handlers);
export const useModalContext = () => {
  const val = useContext(setContext);
  if (Object.entries(val).length <= 0) {
    throw new Error("This hook can only be used inside Modalcontext");
  }
  return val;
};
