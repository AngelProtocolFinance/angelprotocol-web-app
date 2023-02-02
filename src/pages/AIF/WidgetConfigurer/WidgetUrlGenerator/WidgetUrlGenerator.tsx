import { FormProvider, useForm } from "react-hook-form";
import Checkbox from "components/Checkbox";
import Split from "components/Split";
import { BtnPrimary, BtnSec } from "components/donation";
import DenomSelector from "./DenomSelector";
import { FormValues } from "./schema";

type Props = { onChange(formValues: FormValues): void };

export default function WidgetUrlGenerator({ onChange }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: {
      availableCurrencies: [],
      hideText: false,
      hideAdvancedOptions: false,
      unfoldAdvancedOptions: false,
      liquidPercentage: 0,
    },
  });

  const hideAdvancedOptions = methods.watch("hideAdvancedOptions");

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2 xl:w-4/5 text-sm font-normal font-body"
        onSubmit={methods.handleSubmit(onChange)}
      >
        <Checkbox<FormValues> name="hideText">Hide text</Checkbox>

        <span>Available currencies:</span>
        <DenomSelector />

        <Checkbox<FormValues> name="hideAdvancedOptions">
          Hide "advanced options"
        </Checkbox>

        <Checkbox<FormValues>
          name="unfoldAdvancedOptions"
          disabled={hideAdvancedOptions}
          classes={{ label: "peer-disabled:text-gray" }}
        >
          Unfold "advanced options" by default
        </Checkbox>

        <span>Define split value by default:</span>
        <Split<FormValues, "liquidPercentage", never>
          className="mb-6"
          liqPctField="liquidPercentage"
        />

        <div className="flex gap-3 w-full max-xl:justify-center mt-8">
          <BtnSec className="w-40" onClick={() => methods.reset()}>
            Reset Changes
          </BtnSec>
          <BtnPrimary type="submit" className="w-40">
            Update Snippet
          </BtnPrimary>
        </div>
      </form>
    </FormProvider>
  );
}
