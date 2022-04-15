import React, { useState } from "react";
import Status from "../../Status";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";
import Breakdown from "./Breakdown";
import useDonate from "./useDonate";

export default function DonateForm() {
  const { donate, to, isFormLoading, isSubmitDisabled } = useDonate();

  const [isAdvancedOptionShown, setIsAdvancedOptionShown] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

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
        disabled={isSubmitDisabled || !isTermsAccepted}
        className="w-full bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
