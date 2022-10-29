import { Dialog } from "@headlessui/react";
import { createAction } from "@reduxjs/toolkit";
import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { FC } from "react";
import { useSetter } from "store/accessors";

type Handler = () => void;
type Opener = <T extends object>(
  Content: FC<T>,
  props: T,
  parentId?: string
) => void;
type Handlers = {
  showModal: Opener;
  closeModal: Handler;
};

export default function ModalContext(
  props: PropsWithChildren<{ backdropClasses: string; id?: string }>
) {
  const dispatch = useSetter();
  const [Modal, setModal] = useState<ReactElement>();

  const showModal: Opener = useCallback((Modal, props) => {
    setModal(<Modal {...props} key={Modal.name} />);
  }, []);

  const closeModal = useCallback(() => {
    const key = Modal?.key || null;
    setModal(undefined);
    dispatch(modalClosed(key));
  }, [dispatch, Modal?.key]);

  return (
    <setContext.Provider
      value={{
        showModal,
        closeModal,
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

export const modalClosed = createAction<ReactElement["key"]>("modalClosed");
