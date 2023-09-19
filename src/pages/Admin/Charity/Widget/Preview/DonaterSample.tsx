import { WidgetConfig } from "types/widget";
import { placeholderChain } from "contexts/WalletContext/constants";
import AdvancedOptions from "./AdvancedOptions";

const TOKEN = placeholderChain.tokens[0];

export default function DonaterSample({
  advancedOptions,
  classes = "",
}: WidgetConfig & { classes?: string }) {
  return (
    <div className={`${classes} grid rounded-md w-full @container`}>
      <div className="flex flex-col @xl:flex-row items-start @xl:items-center mb-1">
        <p className="text-lg font-bold mr-auto">Enter the donation amount:</p>
        <div className="text-right text-xs">BAL: 0.0000 TOKEN</div>
      </div>

      <div className="flex items-center gap-2 py-3 px-4 border border-gray-l2 rounded mb-1">
        <span className="text-gray-d1 dark:text-gray">0.00000</span>
        <span className="text-sm ml-auto">TOKEN</span>
      </div>
      <p className="text-xs mt-1">
        Minimal amount: {TOKEN.symbol} {TOKEN.min_donation_amnt}
      </p>
      {advancedOptions.display !== "hidden" && (
        <AdvancedOptions
          classes="mt-10"
          liquidPercentage={advancedOptions.liquidSplitPct}
          expanded={advancedOptions.display === "expanded"}
        />
      )}
      <button
        type="button"
        className="btn-orange justify-self-center w-44 font-body mt-8"
      >
        Continue
      </button>
    </div>
  );
}
