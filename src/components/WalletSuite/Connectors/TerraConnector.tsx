import { Connection, ConnectType } from "@terra-money/wallet-provider";
import useWalletContext from "hooks/useWalletContext";
import { useEffect } from "react";
import { TerraIdentifiers } from "services/wallet/types";
import { useGetter } from "store/accessors";
import { setIcon } from "../manageIcon";
import ConnectButton from "./ConnectButton";

export default function TerraConnector(props: Connection) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { availableConnections, connect } = useWalletContext();

  function handleClick() {
    connect(props.type, props.identifier);
    setIcon(props.icon);
  }

  useEffect(() => {
    const isSafePal = availableConnections.some(
      (connection) => connection.identifier === TerraIdentifiers.safepal
    );

    isSafePal && connect(ConnectType.EXTENSION, TerraIdentifiers.safepal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableConnections]);

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
