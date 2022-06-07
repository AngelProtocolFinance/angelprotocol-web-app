import { useState } from "react";
import RegistrationSuccessful from "./RegistrationSuccessful";
import WalletSubmission from "./WalletSubmission";
import useRegisterWallet from "./useRegisterWallet";

export default function RegisterWallet() {
  const [walletAddress] = useState("");
  const { isSuccess, isSubmitting, registerWallet } = useRegisterWallet();

  return isSuccess ? (
    <RegistrationSuccessful walletAddress={walletAddress} />
  ) : (
    <WalletSubmission
      status={"not-connected"}
      walletAddress={walletAddress}
      isSubmitting={isSubmitting}
      onClick={() => registerWallet(walletAddress)}
    />
  );
}
