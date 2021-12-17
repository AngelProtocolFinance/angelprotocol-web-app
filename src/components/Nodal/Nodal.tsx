import { createContext, ReactNode, useContext, useState } from "react";
import { Handlers, Opener, Props } from "./types";

export default function Nodal(props: Props) {
  const [Content, setContent] = useState<ReactNode>();

  const showModal: Opener = (Content, props) => {
    console.log("open");
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
