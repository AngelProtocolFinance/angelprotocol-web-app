import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "pages/Registration/common/FormInput";
import { useRegistrationState } from "services/aws/registration";
import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import { requiredWalletAddr } from "schemas/string";
import { appRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";
import useRegisterWallet from "./useRegisterWallet";

export type Wallet = { address: string };

export default function WalletSubmission() {
  const { wallet } = useGetWallet();
  const { disconnect } = useSetWallet();
  const navigate = useNavigate();
  const { charity } = useRegistrationState();
  const { isSubmitting, registerWallet } = useRegisterWallet();

  // if email was already verified, that means the user can be safely navigated to the Dashboard
  const backLink = charity.Metadata.JunoWallet
    ? `${appRoutes.register}/${routes.dashboard}`
    : `${appRoutes.register}/${routes.additionalInformation}`;

  const methods = useForm<Wallet>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { address: wallet?.address || "" },
    resolver: yupResolver(
      Yup.object({ address: requiredWalletAddr("wallet") })
    ),
  });

  return (
    <div className="flex flex-col h-full items-center gap-10 justify-center">
      <p className="text-3xl font-bold">Register your wallet</p>
      <p>
        Once you have registered your wallet address, we shall be able to create
        your Angel Protocol endowment account. We recommend using a new wallet.
      </p>
      {wallet && wallet.providerId !== "keplr" ? (
        <div className="text-center bg-angel-orange/20 border border-2 border-angel-orange/80 rounded-md p-4 ">
          <p>
            <span className="text-sm font-bold">connected wallet: </span>
            <span className="font-extrabold uppercase">
              {wallet.providerId.toLocaleUpperCase()}
            </span>
          </p>
          <p>Only Keplr wallet is allowed!</p>
          <Button
            className="text-sm uppercase text-angel-orange hover:text-orange px-2 py-1 mt-2"
            disabled={isSubmitting}
            onClick={disconnect}
          >
            Connect Keplr wallet
          </Button>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(registerWallet)}
            className="flex flex-col gap-4 items-center w-[28rem]"
          >
            <FormInput<Wallet>
              fieldName="address"
              label="Juno Wallet address"
              placeholder="juno1..."
            />

            <div className="flex justify-center gap-2">
              <Button
                className="bg-green-400 w-48 h-10"
                disabled={isSubmitting}
                onClick={() => navigate(backLink)}
              >
                Back
              </Button>
              <Button
                submit
                className="bg-thin-blue w-48 h-10"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
