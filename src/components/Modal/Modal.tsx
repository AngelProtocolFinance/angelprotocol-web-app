import { createContext, ReactNode, useContext, useState } from "react";

type Handler = () => void;
interface Props {
  children: ReactNode;
  onModalClose?: Function;
  show?: Boolean;
}

const setContext = createContext<Handler>(() => {});
//use this hook only on components inside Modal
export const useModalCloser = () => useContext(setContext);

export default function Modal(props: Props) {
  const [shown, setShown] = useState(props.show || true);

  function closeModal() {
    if (props.onModalClose && typeof props.onModalClose === "function")
      props.onModalClose();
    setShown(false);
  }

  return (
    <setContext.Provider value={closeModal}>
      {shown && (
        <div
          onClick={closeModal}
          className="fixed bg-gray-800 bg-opacity-80 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center"
        >
          {props.children}
        </div>
      )}
    </setContext.Provider>
  );
}
