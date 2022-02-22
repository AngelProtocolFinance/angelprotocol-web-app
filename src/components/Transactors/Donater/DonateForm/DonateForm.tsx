import { IoMdSettings } from "react-icons/io";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
import { useGetter } from "store/accessors";
import Status from "../../Status";
import Amount from "./Amount";
import useDonate from "./useDonate";
import Breakdown from "./Breakdown";
import Split from "./Split";
import React, { useState } from "react";

export default function DonateForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { getValues } = useFormContext<DonateValues>();
  const { donate } = useDonate();
  const [showSplit, setShowSplit] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const to = getValues("to");
  const toggleAdvancedOptions = () => setShowSplit(!showSplit);
  const confirmRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsAccepted(event.target.checked);
  };

  return (
    <form
      onSubmit={donate}
      className="bg-white grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <Breakdown />
      {to !== "tca" && (
        <button
          type="button"
          onClick={toggleAdvancedOptions}
          className="justify-self-start flex items-center text-md text-grey-accent font-semibold hover:text-angel-grey cursor-pointer my-1"
        >
          <IoMdSettings
            size={20}
            style={{ animationDuration: "4s" }}
            className={`${showSplit ? "animate-spin" : ""}`}
          />
          <span className="uppercase text-sm pb-0.5 ml-0.5">
            {showSplit ? "Hide options" : "Advanced Options"}
          </span>
        </button>
      )}
      {to !== "tca" && showSplit && <Split />}

      <div className="my-3 flex items-start">
        <input
          type="checkbox"
          className="mr-2 mt-0.5"
          id="confirmRole"
          onChange={confirmRole}
        />
        <label
          htmlFor="confirmRole"
          className="text-angel-grey font-light text-xs "
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
        className="w-full bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
