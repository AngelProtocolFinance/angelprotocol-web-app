import { WidgetConfig } from "types/widget";
import AdvancedOptions from "./AdvancedOptions";

export default function DonaterSample({
  display,
  liquidSplitPct,
  classes = "",
}: WidgetConfig["advancedOptions"] & { classes?: string }) {
  return (
    <div className={`${classes} grid rounded-md w-full @container`}>
      <div className="flex flex-col @xl:flex-row items-start @xl:items-center mb-1">
        <p className="text-lg font-bold mr-auto">Enter the donation amount:</p>
        <div className="text-right text-xs">BAL: 0.0000 TOKEN</div>
      </div>

      <div className="flex items-center gap-2 py-3 px-4 border border-gray-l2 rounded mb-1">
        <span className="text-navy-l1 dark:text-gray">0.00000</span>
        <span className="text-sm ml-auto">TOKEN</span>
      </div>
      <p className="text-xs mt-1">Minimal amount: Token 0.0000</p>
      {display !== "hidden" && (
        <AdvancedOptions
          classes="mt-10"
          liquidPercentage={liquidSplitPct}
          expanded={display === "expanded"}
        />
      )}
      <button
        type="button"
        className="btn-orange justify-self-center w-44 mt-8"
      >
        Continue
      </button>
    </div>
  );
}
