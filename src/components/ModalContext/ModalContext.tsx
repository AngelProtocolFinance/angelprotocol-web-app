import { createContext, ReactNode, useContext, useRef, useState } from "react";
import Backdrop from "./Backdrop";
import { Handlers, Opener, Props } from "./types";

export default function ModalContext(props: Props) {
  const [Content, setContent] = useState<ReactNode>();
  const [isBackdropDismissible, setIsBackdropDismissible] = useState(true);
  const lastActiveElRef = useRef<HTMLElement>();

  const showModal: Opener = (Content, props) => {
    setIsBackdropDismissible(props.isDismissDisabled ?? true);
    setContent(<Content {...props} />);
    // track last active element
    lastActiveElRef.current = document.activeElement as HTMLElement;
  };

  function closeModal() {
    setContent(undefined);
    setIsBackdropDismissible(true);
    // pointer to last active dom element
    lastActiveElRef.current?.focus();
  }

  return (
    <setContext.Provider
      value={{
        showModal,
        closeModal,
      }}
    >
      {!!Content && (
        <Backdrop
          _classes={props.backdropClasses}
          _isBackdropDismissible={isBackdropDismissible}
        >
          {Content}
        </Backdrop>
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
