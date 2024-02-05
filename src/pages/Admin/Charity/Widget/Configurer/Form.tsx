import { CheckField } from "components/form";
import { FormHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import EndowmentSelector from "./EndowmentSelector";
import { FormValues as FV } from "./types";

export default function Form({
  className = "",
  onSubmit,
  onReset,
}: FormHTMLAttributes<HTMLFormElement>) {
  const { watch } = useFormContext<FV>();
  const isAdvancedOptionsHidden = watch("isAdvancedOptionsHidden");

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      className={`${className} grid content-start gap-6 text-sm font-body`}
    >
      <label className="-mb-4">nonprofit name:</label>
      <EndowmentSelector />

      <CheckField<FV> name="isDescriptionTextHidden">Hide text</CheckField>

      <CheckField<FV> name="isAdvancedOptionsHidden">
        Hide "advanced options"
      </CheckField>

      <CheckField<FV>
        name="isAdvancedOptionsExpanded"
        disabled={isAdvancedOptionsHidden}
        classes={{ label: "peer-disabled:text-gray" }}
      >
        Unfold "advanced options" by default
      </CheckField>

      <span className="-mb-4">Define split value by default:</span>

      <div className="flex gap-3 w-full max-xl:justify-center -mt-4">
        <button
          type="reset"
          className="btn-outline-filled btn-donate max-sm:mx-auto w-40"
        >
          Reset Changes
        </button>
        <button
          type="submit"
          className="btn-orange btn-donate max-sm:mx-auto w-40"
        >
          Update Snippet
        </button>
      </div>
    </form>
  );
}
