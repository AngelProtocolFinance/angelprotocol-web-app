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

type ModalOptions = { isDismissible: boolean; onClose(): void };
type ModalState = {
  Modal: ReactNode;
} & ModalOptions;

type Opener = <T extends {}>(
  Modal: FC<T>,
  props: T,
  options?: Partial<ModalOptions>
) => void;

type ContextState = {
  //state
  isDismissible: boolean;
  isModalOpen: boolean;

  //setter
  showModal: Opener;
  closeModal(): void;
  setModalOption<T extends keyof ModalOptions>(
    option: T,
    val: ModalOptions[T]
  ): void;
};

export default function ModalContext(
  props: PropsWithChildren<{ id?: string }>
) {
  const [state, setState] = useState<ModalState>();

  const showModal: Opener = useCallback((Modal, props, options) => {
    const { isDismissible = true, onClose = () => {} } = options || {};
    setState({
      Modal: <Modal {...props} />,
      isDismissible,
      onClose,
    });
  }, []);

  const closeModal = useCallback(() => {
    if (state?.isDismissible) return;
    state?.onClose();
    setState(undefined);
  }, [state]);

  const setModalOption = useCallback(
    <T extends keyof ModalOptions>(option: T, val: ModalOptions[T]) => {
      setState((prev) => (prev ? { ...prev, [option]: val } : prev));
    },
    []
  );

  return (
    <Context.Provider
      value={{
        isDismissible: !!state?.isDismissible,
        isModalOpen: !!state?.Modal,

        setModalOption,
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
