import { WalletProxy } from "providers/WalletProvider";
import { useGetter } from "store/accessors";
import { setIcon } from "../manageIcon";
import ConnectButton from "./ConnectButton";

type Props = {
  wallet: WalletProxy;
};

export default function TerraConnector({ wallet }: Props) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { connect, connection } = wallet;

  async function handleClick() {
    await connect();
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
