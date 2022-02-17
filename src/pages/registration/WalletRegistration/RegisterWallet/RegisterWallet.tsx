import { yupResolver } from "@hookform/resolvers/yup";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Action from "components/ActionButton/Action";
import FormInput from "components/FormInput";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetCharityDataQuery } from "services/aws/charity";
import { useGetter } from "store/accessors";
import useEntropyToTerraWallet from "../useEntropyToTerraWallet";
import useOpenLogin from "../useOpenLogin";
import NavigationToDashboard from "./NavigationToDashboard";
import { Values, WalletSchema } from "./types";
import useRegisterWallet from "./useRegisterWallet";
import Title from "./Title";

export default function RegisterWallet() {
  const user = useGetter((state) => state.user);
  const { isLoading, privateKey } = useOpenLogin();
  const { data } = useGetCharityDataQuery(user.PK);
  const { isSuccess, registerWallet } = useRegisterWallet();
  const { status, wallets } = useWallet();
  const entropyToTerraWallet = useEntropyToTerraWallet();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<Values>({
    resolver: yupResolver(WalletSchema),
    defaultValues: {
      walletAddress: user.TerraWallet || data?.Metadata?.TerraWallet,
    },
  });

  useEffect(() => {
    console.log(
      "status === WalletStatus.INITIALIZING",
      status === WalletStatus.INITIALIZING,
      "isLoading",
      isLoading,
      "privatekey",
      privateKey
    );
    if (status === WalletStatus.INITIALIZING || isLoading || !privateKey) {
      return;
    }

    console.log(wallets);

    if (!!wallets.length) {
      return resetField("walletAddress", {
        defaultValue: wallets[0].terraAddress,
      });
    }
    console.log(privateKey);

    const wallet = entropyToTerraWallet(privateKey);
    console.log(wallet);
    resetField("walletAddress", { defaultValue: wallet.key.accAddress });
  }, [
    status,
    isLoading,
    privateKey,
    wallets,
    resetField,
    entropyToTerraWallet,
  ]);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Title isSuccess={isSuccess} />
      <RegistrationExplanation />
      <form
        className="flex flex-col gap-10 items-center w-3/4"
        onSubmit={handleSubmit(registerWallet)}
      >
        <FormInput
          label="Terra Wallet"
          placeholder="terra1..."
          registerReturn={register("walletAddress")}
          errorMessage={errors.walletAddress?.message}
          disabled={isSubmitting || isSuccess}
          required
          errorClassName="mx-auto"
        />
        <Action
          submit
          title="Submit"
          classes="bg-thin-blue w-48 h-10 mb-10"
          disabled={isSubmitting || isSuccess}
          isLoading={isSubmitting}
        />
      </form>
      <NavigationToDashboard
        isSuccess={isSuccess}
        walletAddress={control._formValues.walletAddress}
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
