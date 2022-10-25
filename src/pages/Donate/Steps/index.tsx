import { useEffect } from "react";
import { useGetter, useSetter } from "store/accessors";
import {
  DonationRecipient,
  DonationState,
  setRecipient,
} from "slices/donation";
import Donater from "./Donater";
import KYC from "./KYC";
import Progress from "./Progress";
import Submit from "./Submit";

const NUM_STEPS = 3;

export default function Steps(props: DonationRecipient) {
  const state = useGetter((state) => state.donation);

  const dispatch = useSetter();
  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return (
    <div className="grid padded-container">
      <h3 className="text-center text-3xl font-bold mt-20">
        You'are about to make a donation to
        <span className="block">{props.name}</span>
      </h3>
      <Progress />
      <CurrStep {...state} />
    </div>
  );
}

function CurrStep(props: DonationState) {
  switch (props.step) {
    case 3: {
      return <Submit {...props} />;
    }
    case 2: {
      return <KYC {...props} />;
    }
    case 1: {
      return <Donater />;
    }
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}
