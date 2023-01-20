import { useState } from "react";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import { LoadingStatus } from "components/Status";
import { useRegState, withStepGuard } from "../StepGuard";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

function WalletRegistration() {
  const {
    data: { wallet: prevWallet },
  } = useRegState<3>();
  const wallet = useWalletContext();

  //save prevWallet to intermediate state
  const [prevAddr, setPrevAddr] = useState(prevWallet?.address);

  if (prevAddr) {
    return (
      <RegisteredWallet onChange={() => setPrevAddr("")} address={prevAddr} />
    );
  }

  if (wallet === "loading") {
    return (
      <LoadingStatus classes="justify-center">Wallet is loading</LoadingStatus>
    );
  }

  if (isDisconnected(wallet)) {
    return <ChooseWallet />;
  }

  return <WalletSubmission {...wallet} />;
}

export default withStepGuard(WalletRegistration);
