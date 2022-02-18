import { createContext, ReactNode, useContext, useState } from "react";
import { Handlers, Opener, Props } from "./types";

export default function Modal(props: Props) {
  const [Content, setContent] = useState<ReactNode>();

  const showModal: Opener = (Content, props) => {
    setContent(<Content {...props} />);
  };

  function closeModal() {
    setContent(undefined);
  }

  return (
    <setContext.Provider
      value={{
        showModal,
        hideModal: closeModal,
      }}
    >
      {!!Content && (
        <>
          <div className={props.classes}>{Content}</div>
        </>
      )}

      {props.children}
    </setContext.Provider>
  );
}
const setContext = createContext<Handlers>({
  showModal: () => {},
  hideModal: () => {},
});

export const useSetModal = () => useContext(setContext);
