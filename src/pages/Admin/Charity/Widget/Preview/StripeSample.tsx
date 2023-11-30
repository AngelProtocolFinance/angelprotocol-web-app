import { WidgetConfig } from "types/widget";
import AdvancedOptions from "./AdvancedOptions";

export default function StripeSample({ advancedOptions }: WidgetConfig) {
  return (
    <div>
      {advancedOptions.display !== "hidden" && (
        <AdvancedOptions
          classes="mt-10"
          liquidPercentage={advancedOptions.liquidSplitPct}
          expanded={advancedOptions.display === "expanded"}
        />
      )}
      <p className="text-sm text-gray-d2 dark:text-gray mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <div className="flex gap-3 md:gap-5 justify-center font-body mt-4">
        <button className="btn-orange btn-donate w-1/2" type="button">
          Pay with card
        </button>
      </div>
      <p className="text-sm italic text-gray-d2 dark:text-gray mt-4">
        By making a donation, you agree to our{" "}
        <span className="underline text-orange hover:text-orange-l2">
          Terms & Conditions
        </span>
      </p>
    </div>
  );
}
