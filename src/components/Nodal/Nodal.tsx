import { createContext, ReactNode, useContext, useState } from "react";
import { Handlers, Opener, Props } from "./types";

export default function Nodal(props: Props) {
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
        show: showModal,
        hide: closeModal,
      }}
    >
      {!!Content && (
        <div onClick={closeModal} className={props.classes}>
          {Content}
        </div>
      )}

      {props.children}
    </setContext.Provider>
  );
}
const setContext = createContext<Handlers>({
  show: () => {},
  hide: () => {},
});

export const useSetModal = () => useContext(setContext);
