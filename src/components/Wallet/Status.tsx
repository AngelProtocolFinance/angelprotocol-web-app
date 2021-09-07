import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import LineLoader from "components/Loader/LineLoader";

export default function Status() {
  const { status } = useWallet();

  if (status === WalletStatus.INITIALIZING) {
    return (
      <div className="justify-self-start">
        <LineLoader color={"angel-grey"} size="2" spacing="1" />
      </div>
    );
  } else {
    return null;
  }
}
