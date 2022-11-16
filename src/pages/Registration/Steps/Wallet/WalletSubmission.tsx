import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "pages/Registration/common/FormInput";
import { useRegState } from "services/aws/registration/StepGuard";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import { requiredWalletAddr } from "schemas/string";
import { Button } from "../../common";
import useRegisterWallet from "./useRegisterWallet";

export type Wallet = { address: string };

export default function WalletSubmission({ address, providerId }: WalletState) {
  const { disconnect } = useSetWallet();
  const { nav } = useRegState<4>();
  const { isSubmitting, registerWallet } = useRegisterWallet();

  const methods = useForm<Wallet>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { address },
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
      {providerId !== "keplr" ? (
        <div className="text-center bg-orange/20 border-2 border-orange/80 rounded-md p-4 ">
          <p>
            <span className="text-sm font-bold">connected wallet: </span>
            <span className="font-extrabold uppercase">
              {providerId.toLocaleUpperCase()}
            </span>
          </p>
          <p>Only Keplr wallet is allowed!</p>
          <Button
            className="text-sm uppercase text-orange hover:text-orange px-2 py-1 mt-2"
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
              <Link
                className={`btn-outline-blue w-48 h-10 ${
                  isSubmitting ? "pointer-events-none" : ""
                } `}
                to={`${nav.back}`}
              >
                Back
              </Link>
              <Button
                submit
                className="btn-orange w-48 h-10"
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
