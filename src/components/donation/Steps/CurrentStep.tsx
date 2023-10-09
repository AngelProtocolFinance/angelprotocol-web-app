import { useEffect } from "react";
import { DonaterConfigFromWidget } from "types/widget";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import { useGetter, useSetter } from "store/accessors";
import { resetDetails } from "slices/donation";
import DonateMethods from "./DonateMethods";
import Result from "./Result";
import Submit from "./Submit";

type Props = { config: DonaterConfigFromWidget | null };

export default function CurrentStep({ config }: Props) {
  const state = useGetter((state) => state.donation);
  const dispatch = useSetter();
  const { wallet } = useGetWallet();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  if (state.step === "tx") {
    return <Result {...state} classes="justify-self-center mt-16" />;
  }

  switch (state.step) {
    case "submit": {
      //when wallet is not connected donateState is reset to initial state -> back to donateForm
      return wallet ? <Submit {...state} wallet={wallet} /> : <></>;
    }
    case "kyc-form": {
      return (
        <KYC
          type="on-donation"
          state={state}
          classes="grid gap-5 sm:grid-cols-2"
        />
      );
    }
    case "donate-form": {
      return <DonateMethods donaterConfig={config} state={state} />;
    }

    //init
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}
