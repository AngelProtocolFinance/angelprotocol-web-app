import { LoadingStatus } from "@ap/components/status";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { useState } from "react";
import { useRegState, withStepGuard } from "../StepGuard";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

function WalletRegistration() {
  const {
    data: { wallet: prevWallet },
  } = useRegState<3>();
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
      <LoadingStatus classes="justify-center">Wallet is loading</LoadingStatus>
    );
  }

  if (!wallet) {
    return <ChooseWallet />;
  }

  return <WalletSubmission {...wallet} />;
}

export default withStepGuard(WalletRegistration);
