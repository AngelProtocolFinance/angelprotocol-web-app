import { useEffect } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import { Tooltip } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import { DonationState, resetDetails } from "slices/donation";
import { UnexpectedStateError } from "errors/errors";
import Donater from "./Donater";
import Progress from "./Progress";
import Result from "./Result";
import Submit from "./Submit";

export function Steps() {
  const state = useGetter((state) => state.donation);

  return (
    <div className="justify-self-center grid">
      {isProgressShown(state) && <Progress classes="my-12" />}

      <CurrStep {...state} />
    </div>
  );
}

function CurrStep(props: DonationState) {
  const dispatch = useSetter();
  const { wallet, isLoading } = useGetWallet();
  const { handleError } = useErrorContext();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  useEffect(() => {
    if (props.step < 0 || props.step > 4) {
      handleError(new UnexpectedStateError(`Donation step is ${props.step}`));
    }
  }, [props.step, handleError]);

  if (props.step < 0 || props.step > 4) {
    return <></>;
  }

  if (props.step === 4) {
    return <Result {...props} classes="justify-self-center mt-16" />;
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

  switch (props.step) {
    case 3: {
      return <Submit {...props} wallet={wallet} />;
    }
    case 2: {
      return (
        <KYC
          type="on-donation"
          state={props}
          classes="grid gap-5 sm:grid-cols-2"
        />
      );
    }
    case 1: {
      return <Donater {...props} wallet={wallet} />;
    }
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}

function isProgressShown(state: DonationState): boolean {
  return (
    state.step !== 4 || (state.status !== "error" && !("hash" in state.status))
  );
}
