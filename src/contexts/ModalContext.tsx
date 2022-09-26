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
type Opener = <T = {}>(Content: FC<T>, props: T, parentId?: string) => void;
type Handlers = {
  showModal: Opener;
  closeModal: Handler;
};

export default function ModalContext(
  props: PropsWithChildren<{ backdropClasses: string; id?: string }>
) {
  const [Modal, setModal] = useState<ReactNode>();

  const showModal: Opener = useCallback((Modal, props) => {
    setModal(<Modal {...props} />);
    // track last active element
  }, []);

  const closeModal = useCallback(() => {
    setModal(undefined);
  }, []);

  return (
    <setContext.Provider
      value={{
        showModal,
        closeModal,
      }}
    >
      <Dialog
        open={Modal !== undefined}
        onClose={() => setModal(undefined)}
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
