import { useEffect } from "react";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import { LoadingStatus } from "components/Status";
import { useGetter, useSetter } from "store/accessors";
import { resetDetails } from "slices/donation";
import { ConfigParams } from "..";
import Donater from "./Donater";
import FiatOnlyDonater from "./FiatOnlyDonater";
import FiatSubmit from "./FiatSubmit";
import Result from "./Result";
import Submit from "./Submit";

export default function CurrentStep(props: ConfigParams) {
  const state = useGetter((state) => state.donation);
  const dispatch = useSetter();
  const { wallet, isLoading } = useGetWallet();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  // If there is no wallet connected take user the fiat-only path
  if (!wallet) {
    switch (state.step) {
      case 3: {
        return <FiatSubmit {...state} />;
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
        return <FiatOnlyDonater {...state} config={props} />;
      }
      default: {
        return <></>; // <Steps /> sets to step 1 onMount
      }
    }
  }
  // otherwise take the user to fiat + crypto path
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
        return state.details.token.type === "fiat" ? (
          <FiatSubmit {...state} />
        ) : (
          <Submit {...state} wallet={wallet} />
        );
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
        return <Donater {...state} config={props} wallet={wallet} />;
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
