import { Menu } from "@headlessui/react";
import { Connection } from "contexts/WalletContext";
import Icon from "components/Icon";
import Connector from "./Connector";

export default function WalletSelector(props: {
  connections: Connection[];
  isLoading: boolean;
}) {
  return (
    <Menu
      className={`relative border border-white/40 hover:bg-white/10 rounded-md`}
      as="div"
    >
      <Menu.Button
        className="flex py-2 px-3 items-center text-white"
        disabled={props.isLoading}
      >
        <Icon type="Wallet" className="text-white text-xl mr-2" />
        <span>{props.isLoading ? "Loading" : "Connect"}</span>
      </Menu.Button>

      <Menu.Items className="absolute z-10 bg-zinc-50 w-max p-3 rounded-md mt-2 right-0">
        {props.connections.map((connection) => (
          <Connector {...connection} key={connection.name} />
        ))}
      </Menu.Items>
    </Menu>
  );
}
