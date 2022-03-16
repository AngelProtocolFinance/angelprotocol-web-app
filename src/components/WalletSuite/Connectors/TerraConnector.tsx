import {
  Connection,
  ConnectType,
  useWallet,
} from "@terra-money/wallet-provider";
import { DeviceType, deviceType } from "helpers/deviceType";
import { useEffect } from "react";
import { TerraIdentifiers } from "services/wallet/types";
import { useGetter } from "store/accessors";
import { setIcon } from "../manageIcon";
import ConnectButton from "./ConnectButton";

export default function TerraConnector(props: Connection) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { availableConnections, connect } = useWallet();

  function handleClick() {
    alert(props.identifier);
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
