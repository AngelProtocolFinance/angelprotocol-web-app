import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import routes, { registerRootPath } from "pages/Registration/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationSuccessful from "./RegistrationSuccessful";
import useRegisterWallet from "./useRegisterWallet";
import WalletSubmission from "./WalletSubmission";

export default function RegisterWallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const { isSuccess, isSubmitting, registerWallet } = useRegisterWallet();
  const { status, wallets } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === WalletStatus.WALLET_CONNECTED) {
      setWalletAddress(wallets[0].terraAddress);
    } else if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      setWalletAddress("");
    }
  }, [status, wallets]);

  useEffect(() => {
    if (status !== WalletStatus.INITIALIZING && !wallets.length) {
      // force user to connect wallet
      navigate(`${registerRootPath}/${routes.wallet}`);
    }
  }, [status, wallets.length, navigate]);

  if (status === WalletStatus.INITIALIZING) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return isSuccess ? (
    <RegistrationSuccessful walletAddress={walletAddress} />
  ) : (
    <WalletSubmission
      walletAddress={walletAddress}
      isSubmitting={isSubmitting}
      onClick={() => registerWallet(walletAddress)}
    />
  );
}
