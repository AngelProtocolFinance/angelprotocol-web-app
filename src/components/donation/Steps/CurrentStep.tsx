import { useEffect } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import { Tooltip } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import { resetDetails } from "slices/donation";
import { UnexpectedStateError } from "errors/errors";
import Donater from "./Donater";
import Result from "./Result";
import Submit from "./Submit";

export default function CurrentStep() {
  const state = useGetter((state) => state.donation);
  const dispatch = useSetter();
  const { wallet, isLoading } = useGetWallet();
  const { handleError } = useErrorContext();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  useEffect(() => {
    if (state.step < 0 || state.step > 4) {
      handleError(new UnexpectedStateError(`Donation step is ${state.step}`));
    }
  }, [state.step, handleError]);

  if (state.step < 0 || state.step > 4) {
    return <></>;
  }

  if (state.step === 4) {
    return <Result {...state} classes="justify-self-center mt-16" />;
  }

  if (isLoading) {
    return <Tooltip type="Loading" message="Loading wallet" />;
  }

  if (!wallet) {
    return (
      <Tooltip
        type="Info"
        message="You need to connect your wallet to make a donation"
      />
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
      return <Donater {...state} wallet={wallet} />;
    }
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}
