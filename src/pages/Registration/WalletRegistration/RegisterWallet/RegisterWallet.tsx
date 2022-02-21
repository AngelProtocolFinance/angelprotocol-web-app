import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import useRehydrateUserState from "hooks/useRehydrateUserState";
import { useEffect, useState } from "react";
import Action from "../../Action";
import useEntropyToTerraWallet from "../useEntropyToTerraWallet";
import useOpenLogin from "../useOpenLogin";
import NavigationToDashboard from "./NavigationToDashboard";
import Title from "./Title";
import useRegisterWallet from "./useRegisterWallet";
import FormInput from "components/FormInput";

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

  if (!wallets.length) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <h3 className="font-bold uppercase">Please connect your wallet</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Title isSuccess={isSuccess} />
      <RegistrationExplanation />
      <div className="flex flex-col gap-10 items-center w-3/4">
        <FormInput
          id="walletAddress"
          label="Terra Wallet"
          placeholder="terra1..."
          value={walletAddress}
          disabled
          required
        />
        <Action
          submit
          title="Submit"
          classes="bg-thin-blue w-48 h-10 mb-10"
          disabled={isSubmitting || isSuccess}
          isLoading={isSubmitting}
          onClick={() => registerWallet(walletAddress)}
        />
      </div>
      <NavigationToDashboard
        isSuccess={isSuccess}
        walletAddress={walletAddress}
      />
    </div>
  );
}

function RegistrationExplanation() {
  return (
    <p className="my-10">
      ### EXPLANATION ABOUT WHAT REGISTERING THE WALLET DOES ###
    </p>
  );
}
