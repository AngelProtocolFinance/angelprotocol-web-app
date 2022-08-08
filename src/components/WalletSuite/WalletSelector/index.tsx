import { Menu } from "@headlessui/react";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import Connector from "./Connector";
import { NetworkSelector } from "./NetworkSelector";

export default function WalletSelector(props: { isLoading: boolean }) {
  const { connections } = useSetWallet();
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

      <Menu.Items className="absolute z-10">
        {connections.map((connection) =>
          connection.connections ? (
            <NetworkSelector {...connection} key={connection.name} />
          ) : (
            <Connector {...connection} key={connection.name} />
          )
        )}
      </Menu.Items>
    </Menu>
  );
}
