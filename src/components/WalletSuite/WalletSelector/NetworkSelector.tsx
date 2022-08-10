import { useState } from "react";
import { MultiConnection } from "contexts/WalletContext/types";
import Icon from "components/Icon";
import Connector from "./Connector";

export function NetworkSelector(props: MultiConnection) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="p-2 flex items-center gap-2 w-full items-center border-b border-zinc-900/10"
        onClick={toggle}
      >
        <img
          src={props.logo}
          className="w-8 h-8 object-contain p-1.5 bg-white-grey"
          alt=""
        />
        <p className={`uppercase text-sm text-angel-grey`}>{props.name}</p>
        <Icon type={isOpen ? "Down" : "CaretLeft"} className="ml-auto" />
      </button>
      {isOpen && props.connections.map((c) => <Connector {...c} />)}
    </>
  );
}
