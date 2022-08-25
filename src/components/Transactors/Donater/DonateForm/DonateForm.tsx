import { useState } from "react";
import Status from "../../Status";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";
import Breakdown from "./Breakdown";
import KYCGuard from "./KYCGuard";
import ReceiptTooltip from "./ReceiptTooltip";
import Terms from "./Terms";
import useDonate from "./useDonate";

export default function DonateForm() {
  const { donate, to, isFormLoading, isSubmitDisabled } = useDonate();
  const [isAdvancedOptionShown, setIsAdvancedOptionShown] = useState(false);

  const toggleAdvancedOptions = () => setIsAdvancedOptionShown((prev) => !prev);

  return (
    <form
      onSubmit={donate}
      className="bg-white-grey grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <Breakdown />

      {to !== "tca" && (
        <AdvancedOptions
          toggleAdvancedOptions={toggleAdvancedOptions}
          isOptionsShown={isAdvancedOptionShown}
        />
      )}

      <Terms />
      <ReceiptTooltip />
      <KYCGuard />

      <button
        disabled={isSubmitDisabled}
        className="w-full bg-orange hover:bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
