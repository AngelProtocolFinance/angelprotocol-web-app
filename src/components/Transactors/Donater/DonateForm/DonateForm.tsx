import { useFormContext } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
import { useGetter } from "store/accessors";
import Status from "../../Status";
import Amount from "./Amount";
import useDonate from "./useDonate";
import Breakdown from "./Breakdown";
import React, { useState } from "react";
import AdvancedOptions from "./AdvancedOptions";

export default function DonateForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { getValues } = useFormContext<DonateValues>();
  const { donate } = useDonate();
  const [isAdvancedOptionShown, setIsAdvancedOptionShown] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const to = getValues("to");
  const toggleAdvancedOptions = () => setIsAdvancedOptionShown((prev) => !prev);
  const confirmRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsAccepted(event.target.checked);
  };

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

      <div className="my-3 flex items-start">
        <input
          type="checkbox"
          className="mr-2 mt-0.5"
          id="confirmRole"
          onChange={confirmRole}
        />
        <label
          htmlFor="confirmRole"
          className="text-angel-grey font-light text-xs"
        >
          By clicking this button and donating with Angel Protocol, you
          acknowledge that you have read and accept the{" "}
          <a
            className="text-angel-blue"
            href="/Donor Terms of Use - Angel Protocol - v1.pdf"
          >
            Donor Terms of Use
          </a>
          .
        </label>
      </div>
      <button
        disabled={form_loading || !!form_error || !isTermsAccepted}
        className="w-full bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
