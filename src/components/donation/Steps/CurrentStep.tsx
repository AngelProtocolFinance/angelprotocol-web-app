import { useEffect } from "react";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import { LoadingStatus } from "components/Status";
import { useGetter, useSetter } from "store/accessors";
import { fiatWallet, isFiat, resetDetails } from "slices/donation";
import { ConfigParams } from "..";
import Donater from "./Donater";
import Result from "./Result";
import Submit from "./Submit";

export default function CurrentStep(props: ConfigParams) {
  const state = useGetter((state) => state.donation);
  const dispatch = useSetter();
  const { wallet = fiatWallet, isLoading } = useGetWallet();

  const _key = isFiat(wallet) ? "fiat" : "crypto";

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  if (state.step <= 3) {
    if (isLoading) {
      return (
        <LoadingStatus classes="justify-self-center">
          Loading wallet
        </LoadingStatus>
      );
    }

    switch (state.step) {
      case 3: {
        return <Submit {...state} wallet={wallet} />;
      }
      case 2: {
        return (
          <KYC
            type="on-donation"
            state={state}
            classes="grid gap-5 sm:grid-cols-2"
          />
        );
      }
      case 1: {
        return <Donater {...state} config={props} wallet={wallet} key={_key} />;
      }
      default: {
        return <></>; // <Steps /> sets to step 1 onMount
      }
    }
  } else if (state.step === 4) {
    return <Result {...state} classes="justify-self-center mt-16" />;
  } else {
    return <></>;
  }
}
