import { IS_AST } from "constant/env";
import { useEffect } from "react";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import Status, { LoadingStatus } from "components/Status";
import { useGetter, useSetter } from "store/accessors";
import { fiatWallet, resetDetails } from "slices/donation";
import { ConfigParams } from "..";
import Donater from "./Donater";
import Result from "./Result";
import Submit from "./Submit";

export default function CurrentStep(props: ConfigParams) {
  const state = useGetter((state) => state.donation);
  const dispatch = useSetter();
  const { wallet = IS_AST ? fiatWallet : undefined, isLoading } =
    useGetWallet();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  if (state.step === "tx") {
    return <Result {...state} classes="justify-self-center mt-16" />;
  }

  if (isLoading) {
    return (
      <LoadingStatus classes="justify-self-center">
        Loading wallet
      </LoadingStatus>
    );
  }

  if (!wallet) {
    return (
      <Status icon="Info" classes="justify-self-center">
        You need to connect your wallet to make a donation
      </Status>
    );
  }

  switch (state.step) {
    case "submit": {
      return <Submit {...state} wallet={wallet} />;
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
      return <Donater {...state} config={props} wallet={wallet} />;
    }

    //init
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}
