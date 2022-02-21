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
    if (status === WalletStatus.INITIALIZING || isLoading || !privateKey) {
      return;
    }

    // this flow (using entropyToTerraWallet) will need to be updated once Torus is enabled as a connection method for the whole app
    const address = !!wallets.length
      ? wallets[0].terraAddress
      : entropyToTerraWallet(privateKey).key.accAddress;

    setWalletAddress(address);
  }, [status, isLoading, privateKey, wallets, entropyToTerraWallet]);

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
