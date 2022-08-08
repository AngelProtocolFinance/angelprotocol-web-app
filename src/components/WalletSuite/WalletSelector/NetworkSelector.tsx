import { useState } from "react";
import { MultiConnection } from "contexts/WalletContext/types";
import Connector from "./Connector";

export function NetworkSelector(props: MultiConnection) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="transform active:translate-x-1 bg-thin-blue disabled:bg-grey-accent text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md"
        onClick={toggle}
      >
        <img
          src={props.logo}
          className="w-8 h-8 object-contain p-1.5 bg-white-grey rounded-full shadow-md"
          alt=""
        />
        <p className="uppercase text-sm text-white">{props.name}</p>
      </button>
      {isOpen && props.connections.map((c) => <Connector {...c} />)}
    </>
  );
}
