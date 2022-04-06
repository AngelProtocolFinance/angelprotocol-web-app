import { WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import useWalletContext from "hooks/useWalletContext";
import { useGetBinance } from "providers/BinanceWallet/BinanceWallet";
import { useGetMetamask } from "providers/Metamask/Metamask";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationSuccessful from "./RegistrationSuccessful";
import useRegisterWallet from "./useRegisterWallet";
import WalletSubmission from "./WalletSubmission";

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
