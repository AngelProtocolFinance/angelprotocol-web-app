import { Dialog, Transition } from "@headlessui/react";
import { isEmpty } from "helpers";
import {
  Fragment,
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
  options?: Partial<ModalOptions>,
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
    val: ModalOptions[T],
  ): void;
};

export default function ModalContext(
  props: PropsWithChildren<{ id?: string }>,
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
      if (!prev) throw new Error("there's no modal to close");
      if (!prev.isDismissible) return;
      prev.onClose(); //side effect with no access to state
      return undefined;
    });
  }, []);

  const setModalOption = useCallback(
    <T extends keyof ModalOptions>(option: T, val: ModalOptions[T]) => {
      setState((prev) => {
        if (!prev) throw new Error("there's no modal to update");
        return { ...prev, [option]: val };
      });
    },
    [],
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
      <Transition show={!!state} as={Fragment}>
        <Dialog onClose={closeModal} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="z-10 fixed inset-0 bg-black/50"
              aria-hidden="true"
            />
          </Transition.Child>
          {state?.Modal /** should always be wrapped with Panel */}
        </Dialog>
      </Transition>
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
