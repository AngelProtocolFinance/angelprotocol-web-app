import {
  Connection,
  ConnectType,
  useWallet,
} from "@terra-money/wallet-provider";
import { DeviceType, deviceType } from "helpers/deviceType";
import { useEffect } from "react";
import { useGetter } from "store/accessors";
import { setIcon } from "../manageIcon";
import ConnectButton from "./ConnectButton";

export default function TerraConnector(props: Connection) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { availableConnectTypes, connect } = useWallet();

  function handleClick() {
    connect(props.type, props.identifier);
    setIcon(props.icon);
  }

  useEffect(() => {
    const isSafePal =
      deviceType() === DeviceType.MOBILE &&
      availableConnectTypes.includes(ConnectType.EXTENSION);

    isSafePal && connect(ConnectType.EXTENSION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableConnectTypes]);

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
