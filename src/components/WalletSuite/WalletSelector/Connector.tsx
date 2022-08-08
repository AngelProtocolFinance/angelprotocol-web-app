import { Menu } from "@headlessui/react";
import { SingleConnection } from "contexts/WalletContext/types";
import { WalletError } from "errors/errors";

export default function Connector(props: SingleConnection) {
  async function handleConnect() {
    try {
      await props.connect();
    } catch (_err: any) {
      let errorMsg: string;
      if (_err instanceof WalletError) {
        errorMsg = _err.message;
      } else {
        errorMsg = "Unknown error occured";
      }
      alert(errorMsg);
    }
  }

  return (
    <Menu.Item
      className="transform active:translate-x-1 bg-thin-blue disabled:bg-grey-accent text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md"
      onClick={handleConnect}
      as="button"
    >
      <img
        src={props.logo}
        className="w-8 h-8 object-contain p-1.5 bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm text-white">{props.name}</p>
    </Menu.Item>
  );
}
