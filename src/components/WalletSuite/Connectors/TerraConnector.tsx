import { Connection } from "providers/WalletProvider";
import { useGetter } from "store/accessors";
import { setIcon } from "../manageIcon";
import ConnectButton from "./ConnectButton";

type Props = {
  connection: Connection;
  connect: (connection: Connection) => Promise<void>;
};

export default function TerraConnector({ connection, connect }: Props) {
  const { isUpdating } = useGetter((state) => state.wallet);

  async function handleClick() {
    await connect(connection);
    setIcon(connection.icon);
  }

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
