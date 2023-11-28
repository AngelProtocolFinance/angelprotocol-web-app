import { DonaterConfigFromWidget } from "types/widget";
import KYC from "components/KYC";
import { useGetter } from "store/accessors";
import DonateMethods from "./DonateMethods";
import Result from "./Result";
import Submit from "./Submit";

type Props = { config: DonaterConfigFromWidget | null };

export default function CurrentStep({ config }: Props) {
  const state = useGetter((state) => state.donation);

  if (state.step === "tx") {
    return <Result {...state} classes="justify-self-center mt-16" />;
  }

  switch (state.step) {
    case "submit":
      return <Submit {...state} />;
    case "kyc-form":
      return (
        <KYC
          type="on-donation"
          state={state}
          classes="grid gap-5 sm:grid-cols-2"
        />
      );
    case "donate-form": {
      return <DonateMethods donaterConfig={config} state={state} />;
    }
    //init
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}
