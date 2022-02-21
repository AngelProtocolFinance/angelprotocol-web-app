import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { WalletRegistrationContext } from "../WalletRegistrationProvider";
import RegistrationSuccessful from "./RegistrationSuccessful";
import useRegisterWallet from "./useRegisterWallet";
import WalletSubmission from "./WalletSubmission";

export default function RegisterWallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const { isSuccess, isSubmitting, registerWallet } = useRegisterWallet();
  const { status, wallets } = useWallet();
  const { rootPath } = useContext(WalletRegistrationContext);

  useEffect(() => {
    if (status === WalletStatus.WALLET_CONNECTED) {
      setWalletAddress(wallets[0].terraAddress);
    }
  }, [status, wallets]);

  if (status === WalletStatus.INITIALIZING) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    );
  }

  if (!wallets.length) {
    // force user to connect wallet
    return <Redirect to={rootPath} />;
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
