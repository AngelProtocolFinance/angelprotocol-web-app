import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import useRehydrateUserState from "hooks/useRehydrateUserState";
import { useEffect, useState } from "react";
import useEntropyToTerraWallet from "../useEntropyToTerraWallet";
import useOpenLogin from "../useOpenLogin";
import RegistrationSuccessful from "./RegistrationSuccessful";
import useRegisterWallet from "./useRegisterWallet";
import WalletSubmission from "./WalletSubmission";

export default function RegisterWallet() {
  useRehydrateUserState();

  const [walletAddress, setWalletAddress] = useState("");
  const { isLoading, privateKey } = useOpenLogin();
  const { isSuccess, isSubmitting, registerWallet } = useRegisterWallet();
  const { status, wallets } = useWallet();
  const entropyToTerraWallet = useEntropyToTerraWallet();

  useEffect(() => {
    if (
      status === WalletStatus.INITIALIZING ||
      isLoading ||
      (!privateKey && !wallets.length)
    ) {
      return;
    }

    // (2022-02-21)
    // this flow (using entropyToTerraWallet) will need to be updated once Torus is enabled as a connection method for the whole app
    // this logic should never be reachable, but is left here to show how it should be done.
    // Once Torus is enabled as connection method, this logic should be moved to a component like 'RedirectAuth',
    // which would handle Torus redirects and automatically connect to Torus prior to navigating to this page.
    const address = !!wallets.length
      ? wallets[0].terraAddress
      : entropyToTerraWallet(privateKey).key.accAddress;

    setWalletAddress(address);
  }, [status, isLoading, privateKey, wallets, entropyToTerraWallet]);

  if (status === WalletStatus.INITIALIZING) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    );
  }

  if (!wallets.length) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <h3 className="font-bold uppercase">Please connect your wallet</h3>
      </div>
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
