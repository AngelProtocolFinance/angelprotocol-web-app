import { WidgetConfig } from "types/widget";
import AdvancedOptions from "./AdvancedOptions";

export default function StripeSample({
  display,
  liquidSplitPct,
}: WidgetConfig["advancedOptions"]) {
  return (
    <div>
      {display !== "hidden" && (
        <AdvancedOptions
          classes="mt-10"
          liquidPercentage={liquidSplitPct}
          expanded={display === "expanded"}
        />
      )}
      <p className="text-sm text-navy-d4 dark:text-navy-l2 mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <div className="flex gap-3 md:gap-5 justify-center mt-4">
        <button className="btn-blue w-1/2" type="button">
          Pay with card
        </button>
      </div>
      <p className="text-sm italic text-navy-d4 dark:text-navy-l2 mt-4">
        By making a donation, you agree to our{" "}
        <span className="underline text-blue-d1">Terms & Conditions</span>
      </p>
    </div>
  );
}
