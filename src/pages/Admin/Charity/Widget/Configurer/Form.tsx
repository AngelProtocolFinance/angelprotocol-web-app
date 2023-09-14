import { FormHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import Split from "components/Split";
import { CheckField } from "components/form";
import DenomSelector from "./DenomSelector";
import EndowmentCombobox from "./EndowmentCombobox";

export default function Form({
  onSubmit,
}: FormHTMLAttributes<HTMLFormElement>) {
  const { watch } = useFormContext<FV>();
  const isAdvancedOptionsHidden = watch("isAdvancedOptionsHidden");

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 xl:w-full xl:max-w-md text-sm font-normal font-body"
    >
      <label>Endowment name:</label>
      <EndowmentCombobox />

      <CheckField<FV> name="isDescriptionTextShown">Hide text</CheckField>

      <label>Available currencies:</label>
      <DenomSelector />

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

      <span>Define split value by default:</span>
      <Split<FV, "liquidPercentage", never>
        className="mb-6 xl:w-96"
        liqPctField="liquidPercentage"
      />

      <div className="flex gap-3 w-full max-xl:justify-center mt-8">
        <button
          type="reset"
          className="btn-outline-filled btn-donate max-sm:mx-auto w-40"
        >
          Reset Changes
        </button>
        <button className="btn-orange btn-donate max-sm:mx-auto w-40">
          Update Snippet
        </button>
      </div>
    </form>
  );
}
