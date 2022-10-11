import { useState } from "react";
import Status from "../../Status";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";
import Breakdown from "./Breakdown";
import Terms from "./Terms";
import useDonate from "./useDonate";

export default function DonateForm() {
  const { donate, isFormLoading, isSubmitDisabled } = useDonate();
  const [isAdvancedOptionShown, setIsAdvancedOptionShown] = useState(false);

  const toggleAdvancedOptions = () => setIsAdvancedOptionShown((prev) => !prev);

  return (
    <form
      onSubmit={donate}
      className="bg-white grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status classes="mb-2" />
      <Amount />
      <Breakdown classes="m-1" />

      <AdvancedOptions
        classes="-ml-0.5 mt-6"
        toggleAdvancedOptions={toggleAdvancedOptions}
        isOptionsShown={isAdvancedOptionShown}
      />

      <Terms classes="my-3" />

      <button
        disabled={isSubmitDisabled}
        className="w-full bg-orange hover:bg-orange disabled:bg-gray p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
