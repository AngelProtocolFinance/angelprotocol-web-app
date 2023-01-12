import { BtnPrim } from "components/BtnPrim";
import CheckboxFormField from "components/CheckboxFormField";
import { SelectorFormField } from "components/SelectorFormField";
import Split from "./Split";
import { FormValues } from "./schema";
import useApprovedTokens from "./useApprovedTokens";
import useWidgetUrlGenerator from "./useWidgetUrlGenerator";

type Props = { endowId?: string; onChange(url: string): void };

export default function WidgetUrlGenerator({ endowId, onChange }: Props) {
  const { formValues, reset } = useWidgetUrlGenerator(endowId, onChange);
  const approvedTokens = useApprovedTokens();

  return (
    <div className="flex flex-col gap-2 w-4/5 sm:text-lg font-normal font-body">
      <CheckboxFormField<FormValues> name="hideText">
        Hide text
      </CheckboxFormField>

      <CheckboxFormField<FormValues> name="hideEndowmentGauges">
        Hide endowment gauges
      </CheckboxFormField>

      <span>Available currencies:</span>
      <SelectorFormField<FormValues, "availableCurrencies", string, true>
        name="availableCurrencies"
        options={approvedTokens.map((token) => ({
          label: token,
          value: token,
        }))}
        classes={{ container: "bg-white dark:bg-blue-d6" }}
        multiple
      />

      <CheckboxFormField<FormValues> name="hideAdvancedOptions">
        Hide "advanced options"
      </CheckboxFormField>

      {!formValues.hideAdvancedOptions && (
        <CheckboxFormField<FormValues> name="unfoldAdvancedOptions">
          Unfold "advanced options" by default
        </CheckboxFormField>
      )}

      <span>Define split value by default:</span>
      <Split />

      <BtnPrim className="max-sm:mx-auto mt-8 w-40" onClick={reset}>
        Reset Changes
      </BtnPrim>
    </div>
  );
}
