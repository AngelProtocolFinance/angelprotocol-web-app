import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import FormInput from "pages/Registration/common/FormInput";
import { steps } from "pages/Registration/routes";
import { useRegState } from "services/aws/registration/StepGuard";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import { BtnPrim, BtnSec } from "components/registration";
import { requiredWalletAddr } from "schemas/string";
import useRegisterWallet from "./useRegisterWallet";

export type Wallet = { address: string };

export default function WalletSubmission({ address, providerId }: WalletState) {
  const { disconnect } = useSetWallet();
  const { isSubmitting, registerWallet } = useRegisterWallet();
  const { data } = useRegState<4>();

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
          <BtnPrim
            className="text-sm uppercase text-orange hover:text-orange px-2 py-1 mt-2"
            disabled={isSubmitting}
            onClick={disconnect}
          >
            Connect Keplr wallet
          </BtnPrim>
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
              <BtnSec
                as="link"
                to={`../${steps.profile}`}
                state={data.init}
                disabled={isSubmitting}
              >
                Back
              </BtnSec>
              <BtnPrim type="submit" disabled={isSubmitting}>
                Submit
              </BtnPrim>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
