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

type Func = () => void;
type Opener = <T extends {}>(
  Modal: FC<T>,
  props: T,
  options?: { isDismissible?: boolean }
) => void;

type ModalState = {
  Modal: ReactNode;
  isDismissible: boolean;
};

type ContextState = {
  //state
  isDismissible: boolean;
  isModalOpen: boolean;

  //setter
  showModal: Opener;
  closeModal(): void;
  setIsDismissible(isDismissible: boolean): void;
};

export default function ModalContext(
  props: PropsWithChildren<{ id?: string }>
) {
  const [state, setState] = useState<ModalState>();

  const showModal: Opener = useCallback((Modal, props, options) => {
    const { isDismissible = true } = options || {};
    setState({
      Modal: <Modal {...props} />,
      isDismissible,
    });
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => (prev?.isDismissible ? undefined : prev));
  }, []);

  const setIsDismissible = useCallback(
    (isDismissible: ModalState["isDismissible"]) => {
      setState((prev) => (prev ? { ...prev, isDismissible } : prev));
    },
    []
  );

  return (
    <Context.Provider
      value={{
        isDismissible: !!state?.isDismissible,
        isModalOpen: !!state?.Modal,

        setIsDismissible,
        showModal,
        closeModal,
      }}
    >
      <Dialog
        open={state !== undefined}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="z-10 fixed inset-0 bg-black/50" aria-hidden="true" />
        {state?.Modal /** should always be wrapped with Dialog.Panel */}
      </Dialog>

      {props.children}
    </Context.Provider>
  );
}

const Context = createContext<ContextState>({} as ContextState);

export const useModalContext = () => {
  const val = useContext(Context);
  if (Object.entries(val).length <= 0) {
    throw new Error("This hook can only be used inside Modalcontext");
  }
  return val;
};
