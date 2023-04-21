import { useGetter } from "store/accessors";
import { DonationState } from "slices/donation";
import CurrentStep from "./CurrentStep";
import Progress from "./Progress";

export type ConfigParams = {
  hideAdvOpts?: boolean;
  unfoldAdvOpts?: boolean;
  liquidPct?: number;
  availCurrs?: string[];
};

type Props = { className?: string } & ConfigParams;

export function Steps({ className = "", ...params }: Props) {
  const state = useGetter((state) => state.donation);

  return (
    <div className={`justify-self-center grid sm:w-full ${className}`}>
      {!isFinalized(state) && <Progress classes="my-12" />}
      <CurrentStep {...params} />
    </div>
  );
}

function isFinalized(state: DonationState): boolean {
  return (
    state.step === 4 && (state.status === "error" || "hash" in state.status)
  );
}
