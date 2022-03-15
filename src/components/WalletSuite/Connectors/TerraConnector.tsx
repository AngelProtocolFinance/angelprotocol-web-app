import { Connection, useWallet } from "@terra-money/wallet-provider";
import { useGetter } from "store/accessors";
import { setIcon } from "../manageIcon";
import ConnectButton from "./ConnectButton";

export default function TerraConnector(props: Connection) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { connect } = useWallet();

  function handleClick() {
    connect(props.type, props.identifier);
    setIcon(props.icon);
  }

  return (
    <ConnectButton
      onClick={handleClick}
      _icon={props.icon}
      disabled={isUpdating}
    >
      {props.name}
    </ConnectButton>
  );
}
