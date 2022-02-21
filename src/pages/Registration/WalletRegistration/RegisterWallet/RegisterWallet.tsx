import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import RegistrationSuccessful from "./RegistrationSuccessful";
import useRegisterWallet from "./useRegisterWallet";
import WalletSubmission from "./WalletSubmission";

export default function RegisterWallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const { isSuccess, isSubmitting, registerWallet } = useRegisterWallet();
  const { status, wallets } = useWallet();
  const { path } = useRouteMatch();

  useEffect(() => {
    if (status === WalletStatus.INITIALIZING || !wallets.length) {
      return;
    }

    setWalletAddress(wallets[0].terraAddress);
  }, [status, wallets]);

  if (status === WalletStatus.INITIALIZING) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    );
  }

  if (!wallets.length) {
    // redirect to component at /app/register/wallet to force user to connect wallet
    return <Redirect to={path.substring(0, path.lastIndexOf("/"))} />;
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
