import KYC from "@ap/components/kyc";
import Status, { LoadingStatus } from "@ap/components/status";
import { useGetWallet } from "@ap/contexts/wallet-context";
import {
  DonationDispatch,
  SliceState,
  resetDetails,
} from "@ap/slices/donation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Donater from "./Donater";
import Result from "./Result";
import Submit from "./Submit";
import { ConfigParams } from "./index";

export default function CurrentStep(props: ConfigParams) {
  const state = useSelector((state: SliceState) => state.donation);
  const dispatch = useDispatch<DonationDispatch>();
  const { wallet, isLoading } = useGetWallet();

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

    if (!wallet) {
      return (
        <Status icon="Info" classes="justify-self-center">
          You need to connect your wallet to make a donation
        </Status>
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
