import Airdrop from "./Airdrop";
import ConnectButton from "./ConnectButton";
import TransactionHint from "./TransactionHint";

export default function WalletSuite() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto]">
      <TransactionHint />
      <ConnectButton />
      <Airdrop />
    </div>
  );
}
