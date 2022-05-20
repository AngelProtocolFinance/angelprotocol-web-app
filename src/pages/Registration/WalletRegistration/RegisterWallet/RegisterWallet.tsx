import { WalletStatus } from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import useWalletContext from "hooks/useWalletContext";
import RegistrationSuccessful from "./RegistrationSuccessful";
import WalletSubmission from "./WalletSubmission";
import useRegisterWallet from "./useRegisterWallet";

export default function RegisterWallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const { isSuccess, isSubmitting, registerWallet } = useRegisterWallet();
  const { status, wallet } = useWalletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === WalletStatus.WALLET_CONNECTED) {
      setWalletAddress(wallet!.address);
    }
  }, [status, wallet, navigate]);

  if (status === WalletStatus.INITIALIZING) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return isSuccess ? (
    <RegistrationSuccessful walletAddress={walletAddress} />
  ) : (
    <WalletSubmission
      status={status}
      walletAddress={walletAddress}
      isSubmitting={isSubmitting}
      onClick={() => registerWallet(walletAddress)}
    />
  );
}
