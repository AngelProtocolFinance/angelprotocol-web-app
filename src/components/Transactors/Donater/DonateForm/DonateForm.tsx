import React, { useState } from "react";
import Status from "../../Status";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";
import Breakdown from "./Breakdown";
import NetworkPrompt from "./NetworkPrompt";
import useDonate from "./useDonate";

export default function DonateForm() {
  const {
    donate,
    to,
    isFormLoading,
    isSubmitDisabled,
    isKycCompleted,
    isKycRequired,
    showKycForm,
  } = useDonate();
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
      <NetworkPrompt />
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
            href="https://storageapi2.fleek.co/57b943eb-ed70-478a-8899-c7859400f77b-bucket/documents/Donor Terms of Use - Angel Protocol - v1.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Donor Terms of Use
          </a>
        </label>
      </div>
      {isKycRequired && (
        <div>
          <span>[{isKycCompleted ? "x" : " "}]</span>
          <p>This charity only accepts donations with KYC data</p>
          <button onClick={showKycForm} type="button">
            kyc form
          </button>
        </div>
      )}

      <button
        disabled={isSubmitDisabled || !isTermsAccepted}
        className="w-full bg-orange hover:bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
