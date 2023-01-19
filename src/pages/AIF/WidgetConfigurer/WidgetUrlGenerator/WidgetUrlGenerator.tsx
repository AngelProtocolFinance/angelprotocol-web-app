import { FormProvider } from "react-hook-form";
import CheckboxFormField from "components/CheckboxFormField";
import DenomSelector from "./DenomSelector";
import Split from "./Split";
import { FormValues } from "./schema";
import useWidgetUrlGenerator from "./useWidgetUrlGenerator";

type Props = { endowId?: string; onChange(url: string): void };

export default function WidgetUrlGenerator({ endowId, onChange }: Props) {
  const methods = useWidgetUrlGenerator(endowId, onChange);

  const hideAdvancedOptions = methods.watch("hideAdvancedOptions");

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-2 w-4/5 sm:text-lg font-normal font-body">
        <CheckboxFormField<FormValues> name="hideText">
          Hide text
        </CheckboxFormField>

        <span>Available currencies:</span>
        <DenomSelector />

        <CheckboxFormField<FormValues> name="hideAdvancedOptions">
          Hide "advanced options"
        </CheckboxFormField>

        <CheckboxFormField<FormValues>
          name="unfoldAdvancedOptions"
          disabled={hideAdvancedOptions}
          classes={{ label: "peer-disabled:text-gray" }}
        >
          Unfold "advanced options" by default
        </CheckboxFormField>

        <span>Define split value by default:</span>
        <Split />

        <button
          type="reset"
          className="btn-outline-filled btn-donate max-sm:mx-auto mt-8 w-40"
          onClick={() => methods.reset()}
        >
          Reset Changes
        </button>
      </div>
    </FormProvider>
  );
}
