import { useEffect } from "react";
import { useGetter, useSetter } from "store/accessors";
import { DonationRecipient, setRecipient } from "slices/donation";
import Donater from "./Donater";
import KYC from "./KYC";
import Submit from "./Submit";

export default function Steps(props: DonationRecipient) {
  const dispatch = useSetter();
  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return (
    <div className="grid">
      <h3 className="text-center text-3xl font-bold mt-20">
        You'are about to make a donation to
        <span className="block">{props.name}</span>
      </h3>
      <CurrStep />
    </div>
  );
}

function CurrStep() {
  const state = useGetter((state) => state.donation);
  switch (state.step) {
    case 3: {
      return <Submit />;
    }
    case 2: {
      return <KYC />;
    }
    default: {
      return <Donater />;
    }
  }
}
