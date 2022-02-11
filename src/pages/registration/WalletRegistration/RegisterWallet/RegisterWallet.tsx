import { yupResolver } from "@hookform/resolvers/yup";
import Action from "components/ActionButton/Action";
import FormInput from "components/FormInput";
import useRehydrateUserState from "hooks/useRehydrateUserState";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetCharityDataQuery } from "services/aws/charity";
import { useGetter, useSetter } from "store/accessors";
import { LocalStorageKey } from "../types";
import NavigationToDashboard from "./NavigationToDashboard";
import Title from "./Title";
import { Values, WalletSchema } from "./types";
import useRegisterWallet from "./useRegisterWallet";
import { setConnectedWallet } from "../../registrationSlice";

export default function RegisterWallet() {
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const connectedWalletAddress = useGetter(
    (state) => state.registration.connectedWalletAddress
  );
  const { data } = useGetCharityDataQuery(user.PK);
  const { isSuccess, registerWallet } = useRegisterWallet();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
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

  useRehydrateUserState();

  useEffect(() => {
    if (!connectedWalletAddress) {
      const local =
        localStorage.getItem(LocalStorageKey.CONNECTED_WALLET_ADDRESS) || "";
      dispatch(setConnectedWallet(local));
      resetField("wallet_number", { defaultValue: local });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, resetField]);

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
