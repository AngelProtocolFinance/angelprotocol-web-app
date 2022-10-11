import { Menu } from "@headlessui/react";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import Connector from "./Connector";

export default function WalletSelector(props: { isLoading: boolean }) {
  const { connections } = useSetWallet();
  return (
    <Menu className="relative" as="div">
      <Menu.Button
        className="flex grow-0 w-32 h-10 py-2 px-3 justify-center items-center rounded-lg bg-orange hover:bg-orange-l1 text-white gap-2 font-bold text-base"
        disabled={props.isLoading}
      >
        <Icon type="Wallet" className="text-xl grow-0" />
        <span className="uppercase">
          {props.isLoading ? "Loading" : "Connect"}
        </span>
      </Menu.Button>

      <Menu.Items className="absolute z-10 bg-white w-max p-3 rounded-md mt-2 right-0">
        {connections.map((connection) => (
          <Connector {...connection} key={connection.name} />
        ))}
      </Menu.Items>
    </Menu>
  );
}
