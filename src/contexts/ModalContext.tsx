import { Dialog, DialogBackdrop } from "@headlessui/react";
import { isEmpty } from "helpers";
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { FC } from "react";

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
    setState((prev) => {
      if (!prev) return prev;
      if (!prev.isDismissible) return prev;
      prev.onClose(); //side effect with no access to state
      return undefined;
    });
  }, []);

  const setModalOption = useCallback(
    <T extends keyof ModalOptions>(option: T, val: ModalOptions[T]) => {
      setState((prev) => {
        if (!prev) return prev;
        return { ...prev, [option]: val };
      });
    },
    []
  );

  return (
    <Context.Provider
      value={{
        isDismissible: !!state?.isDismissible,
        isModalOpen: !!state,

        setModalOption,
        showModal,
        closeModal,
      }}
    >
      <Dialog open={!!state} onClose={closeModal} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0" />
        {state?.Modal /** should always be wrapped with Panel */}
      </Dialog>
      {props.children}
    </Context.Provider>
  );
}

const Context = createContext<ContextState>({} as ContextState);

export const useModalContext = () => {
  const val = useContext(Context);
  if (isEmpty(Object.entries(val))) {
    throw new Error("This hook can only be used inside Modalcontext");
  }
  return val;
};
