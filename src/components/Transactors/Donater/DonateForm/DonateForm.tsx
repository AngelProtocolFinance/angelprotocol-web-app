import React, { useState } from "react";
import Status from "../../Status";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";
import Breakdown from "./Breakdown";
import useDonate from "./useDonate";

export default function DonateForm() {
  const {
    donate,
    to,
    isFormLoading,
    isSubmitDisabled,
    isNetworkPromptShown,
    correctNetworkInfo,
    isSwitchingNetwork,
    handleNetworkChange,
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
      {isNetworkPromptShown && (
        <div className="grid bg-amber-400/5 border-2 rounded-md border-amber-400/20 p-1.5 mb-2">
          <p className="text-xs font-mono text-amber-500">
            To transact{" "}
            <span className="font-semibold">{correctNetworkInfo.symbol}</span>,
            kindly switch wallet network to{" "}
            <span className="text-amber-500 font-semibold">
              {correctNetworkInfo.name}
            </span>
          </p>
          <button
            disabled={isSwitchingNetwork}
            onClick={handleNetworkChange}
            className="justify-self-end text-xs font-bold text-angel-blue hover:text-bright-blue active:text-angel-orange uppercase font-heading"
            type="button"
          >
            {isSwitchingNetwork ? "Switching..." : "Switch to Network"}
          </button>
        </div>
      )}
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
          .
        </label>
      </div>

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
