import KYC from "components/KYC";
import { useGetter } from "store/accessors";
import { ConfigParams } from "..";
import Donater from "./Donater";
import FiatSubmit from "./FiatSubmit";

export default function CurrentStep(props: ConfigParams) {
  const state = useGetter((state) => state.donation);

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
      return <Donater {...state} config={props} />;
    }
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}
