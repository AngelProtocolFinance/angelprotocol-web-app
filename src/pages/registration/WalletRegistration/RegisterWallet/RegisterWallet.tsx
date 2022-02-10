import { yupResolver } from "@hookform/resolvers/yup";
import Action from "components/ActionButton/Action";
import Input from "components/ContactDetailsForm/Input";
import { useForm } from "react-hook-form";
import { useGetCharityDataQuery } from "services/aws/charity";
import { useGetter } from "store/accessors";
import NavigationToDashboard from "./NavigationToDashboard";
import Title from "./Title";
import { Values, WalletSchema } from "./types";
import useRegisterWallet from "./useRegisterWallet";

export default function RegisterWallet() {
  const user = useGetter((state) => state.user);
  const connectedWalletAddress = useGetter(
    (state) => state.registration.connectedWalletAddress
  );
  const { data } = useGetCharityDataQuery(user.PK);
  const { isSuccess, registerWallet } = useRegisterWallet(user);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: yupResolver(WalletSchema),
    defaultValues: {
      wallet_number:
        connectedWalletAddress ||
        user.TerraWallet ||
        data?.Metadata?.TerraWallet ||
        "",
    },
  });

  return (
    <div className="flex flex-col h-full items-center">
      <Title isSuccess={isSuccess} />
      <RegistrationExplanation />
      <form
        className="flex flex-col gap-10 items-center w-1/2"
        onSubmit={handleSubmit(registerWallet)}
      >
        <Input
          label="Terra Wallet"
          placeholder="terra1..."
          registerReturn={register("wallet_number")}
          errorMessage={errors.wallet_number?.message}
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
        walletAddress={control._formValues.wallet_number}
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
