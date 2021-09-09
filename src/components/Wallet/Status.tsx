import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import LineLoader from "components/Loader/LineLoader";
import { useHeaderColors } from "contexts/HeaderColorProvider";

export default function Status() {
  const { textColor } = useHeaderColors();
  const { status } = useWallet();

  if (status === WalletStatus.INITIALIZING) {
    return (
      <div className="justify-self-start">
        <LineLoader color={textColor} size="2" spacing="1" />
      </div>
    );
  } else {
    return null;
  }
}
