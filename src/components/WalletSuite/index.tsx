import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import ConnectButton from "./ConnectButton";

export default function WalletSuite() {
  return (
    <div className="ml-5 grid grid-cols-[auto_1fr_auto]">
      <TransactionHint />
      <ConnectButton />
      <Airdrop />
    </div>
  );
}
