import { FormProvider, useForm } from "react-hook-form";
import Split from "components/Split";
import { CheckField } from "components/form/CheckField";
import DenomSelector from "./DenomSelector";
import EndowmentCombobox from "./EndowmentCombobox";
import { FormValues } from "./schema";

type Props = {
  defaultValues: FormValues;
  onChange(formValues: FormValues): void;
};

export default function WidgetUrlGenerator({ defaultValues, onChange }: Props) {
  const methods = useForm<FormValues>({ defaultValues });

  const hideAdvancedOptions = methods.watch("hideAdvancedOptions");

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2 xl:w-full xl:max-w-md text-sm font-normal font-body"
        onSubmit={methods.handleSubmit(onChange)}
      >
        <label>Endowment name:</label>
        <EndowmentCombobox />

        <CheckField<FormValues> name="hideText">Hide text</CheckField>

        <span>Available currencies:</span>
        <DenomSelector />

        <CheckField<FormValues> name="hideAdvancedOptions">
          Hide "advanced options"
        </CheckField>

        <CheckField<FormValues>
          name="unfoldAdvancedOptions"
          disabled={hideAdvancedOptions}
          classes={{ label: "peer-disabled:text-gray" }}
        >
          Unfold "advanced options" by default
        </CheckField>

        <span>Define split value by default:</span>
        <Split<FormValues, "liquidPercentage", never>
          className="mb-6 xl:w-96"
          liqPctField="liquidPercentage"
        />

        <div className="flex gap-3 w-full max-xl:justify-center mt-8">
          <button
            type="reset"
            className="btn-outline-filled btn-donate max-sm:mx-auto w-40"
            onClick={() => methods.reset()}
          >
            Reset Changes
          </button>
          <button className="btn-orange btn-donate max-sm:mx-auto w-40">
            Update Snippet
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
