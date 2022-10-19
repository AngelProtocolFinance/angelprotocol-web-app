import Airdrop from "./Airdrop";
import ConnectButton from "./ConnectButton";
import TransactionHint from "./TransactionHint";

type Props = { menuPlacement?: "top" | "bottom" };

export default function WalletSuite(props: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto]">
      <TransactionHint />
      <ConnectButton {...props} />
      <Airdrop />
    </div>
  );
}
