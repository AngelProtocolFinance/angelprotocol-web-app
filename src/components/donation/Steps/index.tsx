import { DonaterConfigFromWidget } from "types/widget";
import { useGetter } from "store/accessors";
import { DonationState } from "slices/donation";
import { PAYMENT_WORDS } from "constants/common";
import { IS_AST } from "constants/env";
import CurrentStep from "./CurrentStep";

type Props = {
  className?: string;
  donaterConfig: DonaterConfigFromWidget | null;
};

export function Steps({ className = "", donaterConfig }: Props) {
  const state = useGetter((state) => state.donation);

  return (
    <div className={`grid ${className}`}>
      {!isFinalized(state) && (
        <span className="text-center font-normal text-xs sm:text-sm mb-12">
          Connect the wallet of your choice to donate crypto. <br />
          {IS_AST
            ? `Continue below to ${PAYMENT_WORDS.verb} fiat (Dollars, GBP, AUD, Euro)`
            : ""}
        </span>
      )}

      <CurrentStep config={donaterConfig} />
    </div>
  );
}

function isFinalized(state: DonationState): boolean {
  return (
    state.step === "tx" && (state.status === "error" || "hash" in state.status)
  );
}
