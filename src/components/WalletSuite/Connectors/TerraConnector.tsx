import useWalletContext from "hooks/useWalletContext";
import { ConnectFunction, Connection } from "providers/WalletProvider";
import { useEffect } from "react";
import { TerraIdentifiers } from "services/wallet/types";
import { useGetter } from "store/accessors";
import { setIcon } from "../manageIcon";
import ConnectButton from "./ConnectButton";

type Props = { connection: Connection; connect: ConnectFunction };

export default function TerraConnector({ connection, connect }: Props) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { availableConnections } = useWalletContext();

  function handleClick() {
    connect(connection);
    setIcon(connection.icon);
  }

  useEffect(() => {
    const safePal = availableConnections.find(
      (connection) => connection.identifier === TerraIdentifiers.safepal
    );

    !!safePal && connect(safePal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableConnections]);

  return (
    <ConnectButton
      onClick={handleClick}
      _icon={connection.icon}
      disabled={isUpdating}
    >
      {connection.name}
    </ConnectButton>
  );
}
