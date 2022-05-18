import { WalletProxy } from "providers/WalletProvider";
import { useGetter } from "store/accessors";
import ConnectButton from "./ConnectButton";

type Props = {
  wallet: WalletProxy;
};

export default function TerraConnector({ wallet }: Props) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { connect, connection } = wallet;

  return (
    <ConnectButton
      onClick={connect}
      _icon={connection.icon}
      disabled={isUpdating}
    >
      {connection.name}
    </ConnectButton>
  );
}
