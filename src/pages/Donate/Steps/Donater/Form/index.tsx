import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";
import AmountOptions from "./AmountOptions";
import Terms from "./Terms";

export default function DonateForm() {
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DonateValues>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <Amount />
      <AmountOptions classes="mt-3" />
      <AdvancedOptions classes="mt-10" />

      <Terms classes="my-3" />

      <button
        disabled={!isValid || !isDirty || isSubmitting}
        className="w-full bg-orange hover:bg-orange disabled:bg-gray p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {"submit"}
      </button>
    </form>
  );
}
