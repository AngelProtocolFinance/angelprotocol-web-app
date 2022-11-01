import { useEffect } from "react";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import { Tooltip } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import {
  DonationRecipient,
  DonationState,
  setRecipient,
} from "slices/donation";
import Donater from "./Donater";
import Progress from "./Progress";
import Submit from "./Submit";

export default function Steps(props: DonationRecipient) {
  const state = useGetter((state) => state.donation);

  const dispatch = useSetter();
  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return (
    <div className="justify-self-center grid padded-container max-w-[32rem]">
      <h3 className="text-center text-3xl font-bold mt-20 leading-snug">
        You'are about to make a donation to {props.name}
      </h3>
      <Progress />
      <CurrStep {...state} />
    </div>
  );
}

function CurrStep(props: DonationState) {
  const { wallet, isLoading } = useGetWallet();

  if (isLoading && props.step <= 3) {
    return <Tooltip type="Loading" message="Loading wallet" />;
  }

  if (!wallet && props.step <= 3) {
    return (
      <Tooltip
        type="Info"
        message="You need to connect your wallet do make a donation"
      />
    );
  }

  switch (props.step) {
    case 3: {
      return <Submit {...props} wallet={wallet!} />; //defined for steps 1 -> 3
    }
    case 2: {
      return (
        <KYC
          type="on-donation"
          state={props}
          classes="grid gap-5 min-[510px]:grid-cols-2"
        />
      );
    }
    case 1: {
      return <Donater {...props} wallet={wallet!} />; //defined for steps 1 -> 3
    }
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}
