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
  isDismissible: boolean;
  showModal: Opener;
  closeModal: Handler;
  onModalClose: (func: Handler) => void;
  setDismissible: (value: boolean) => void;
};

export default function ModalContext(
  props: PropsWithChildren<{ backdropClasses: string; id?: string }>
) {
  const [Modal, setModal] = useState<ReactNode>();
  const [isDismissible, setDismissible] = useState(true);
  const [onClose, setOnClose] = useState<Handler>();

  const showModal: Opener = useCallback((Modal, props) => {
    setModal(<Modal {...props} />);
    // track last active element
  }, []);

  const closeModal = useCallback(() => {
    if (!isDismissible) {
      return;
    }
    setModal(undefined);
    if (onClose) {
      onClose();
      setOnClose(undefined);
    }
  }, [isDismissible, onClose]);

  const onModalClose = useCallback(
    (func: Handler) => setOnClose(() => func),
    []
  );

  const handleSetDismissible = useCallback(
    (value: boolean) => {
      if (value !== isDismissible) {
        setDismissible(value);
      }
    },
    [isDismissible]
  );

  return (
    <setContext.Provider
      value={{
        isDismissible,
        showModal,
        closeModal,
        onModalClose,
        setDismissible: handleSetDismissible,
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
