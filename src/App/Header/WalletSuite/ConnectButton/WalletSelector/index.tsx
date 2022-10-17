import { Menu } from "@headlessui/react";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import Connector from "./Connector";

type Props = { isLoading: boolean; menuPlacement?: "top" | "bottom" };

export default function WalletSelector(props: Props) {
  const { connections } = useSetWallet();
  return (
    <Menu className="relative" as="div">
      <Menu.Button
        className="flex grow-0 w-32 h-10 py-2 px-3 justify-center items-center rounded-lg bg-orange hover:bg-orange-l1 text-white gap-2 font-bold text-sm sm:text-base"
        disabled={props.isLoading}
      >
        <Icon type="Wallet" className="text-lg sm:text-xl grow-0" />
        <span className="uppercase">
          {props.isLoading ? "Loading" : "Connect"}
        </span>
      </Menu.Button>

      <Menu.Items
        className={`absolute z-10 bg-white w-max p-3 rounded-md right-0 ${
          props.menuPlacement === "top" ? "-translate-y-full -top-2" : "mt-2"
        }`}
      >
        {connections.map((connection) => (
          <Connector {...connection} key={connection.name} />
        ))}
      </Menu.Items>
    </Menu>
  );
}
