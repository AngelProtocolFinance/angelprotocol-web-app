import { useGetter } from "store/accessors";
import DonateMethods from "./DonateMethods";
import Result from "./Result";
import Splits from "./Splits";
import Submit from "./Submit";
import Summary from "./Summary";
import Tip from "./Tip";
import { Config } from "./types";

type Props = { config: Config | null };

export default function CurrentStep({ config }: Props) {
  const state = useGetter((state) => state.donation);

  if (state.step === "init") return <></>; // <Steps /> sets to step 1 onMount

  if (state.step === "donate-form") {
    return <DonateMethods donaterConfig={config} state={state} />;
  }

  if (state.step === "splits") {
    return <Splits {...state} liquidSplitPct={config?.liquidSplitPct} />;
  }

  if (state.step === "tip") {
    return <Tip {...state} />;
  }

  if (state.step === "summary") {
    return <Summary {...state} isPreview={config?.isPreview} />;
  }

  if (state.step === "submit") {
    return <Submit {...state} />;
  }

  state.step satisfies "tx";
  return <Result {...state} classes="justify-self-center p-4 @md/steps:p-8" />;
}
