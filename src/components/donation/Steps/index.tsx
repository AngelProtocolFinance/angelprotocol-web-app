import { useGetter } from "store/accessors";
import { DonationState } from "slices/donation";
import { PAYMENT_WORDS } from "constants/common";
import { IS_AST } from "constants/env";
import CurrentStep from "./CurrentStep";

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
    <div className={`justify-self-center grid ${className}`}>
      {!isFinalized(state) && (
        <span className="text-center font-normal text-xs sm:text-sm mb-12">
          Connect the wallet of your choice to donate crypto. <br />
          {IS_AST
            ? `Continue below to ${PAYMENT_WORDS.verb} fiat (Dollars, GBP, AUD, Euro)`
            : ""}
        </span>
      )}

      <CurrentStep {...params} />
    </div>
  );
}

function isFinalized(state: DonationState): boolean {
  return (
    state.step === "tx" && (state.status === "error" || "hash" in state.status)
  );
}
