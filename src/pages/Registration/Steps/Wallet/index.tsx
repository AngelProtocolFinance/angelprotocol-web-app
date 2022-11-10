import { useState } from "react";
import { useRegState } from "services/aws/registration/StepGuard";
import { useGetWallet } from "contexts/WalletContext";
import RegLoader from "../../common/RegLoader";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

export default function WalletRegistration() {
  const {
    data: { wallet: prevWallet },
  } = useRegState<4>();
  const { wallet, isLoading } = useGetWallet();

  //save prevWallet to intermediate state
  const [prevAddr, setPrevAddr] = useState(prevWallet?.address);

  if (prevAddr) {
    return (
      <RegisteredWallet onChange={() => setPrevAddr("")} address={prevAddr} />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <RegLoader message="Wallet is loading" />
      </div>
    );
  }

  if (!wallet) {
    return <ChooseWallet />;
  }

  return <WalletSubmission {...wallet} />;
}
