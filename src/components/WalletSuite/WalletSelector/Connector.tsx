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
      className="group p-2 flex items-center gap-2 w-full items-center last:border-none border-b border-zinc-900/10"
      onClick={handleConnect}
      as="button"
    >
      <img
        src={props.logo}
        className="w-8 h-8 object-contain p-1.5 bg-white-grey"
        alt=""
      />
      <p className="uppercase text-sm text-angel-grey group-hover:text-sky-500 group-active:text-amber-500">
        {props.name}
      </p>
    </Menu.Item>
  );
}
