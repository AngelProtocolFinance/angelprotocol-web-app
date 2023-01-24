import { FormProvider, useForm } from "react-hook-form";
import Checkbox from "components/Checkbox";
import { BtnPrimary, BtnSec } from "components/donation";
import DenomSelector from "./DenomSelector";
import Split from "./Split";
import { FormValues } from "./schema";
import useSubmit from "./useSubmit";

type Props = { endowId?: string; onChange(url: string): void };

export default function WidgetUrlGenerator({ endowId, onChange }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: {
      availableCurrencies: [],
      hideText: false,
      hideAdvancedOptions: false,
      unfoldAdvancedOptions: false,
      liquidPercentage: 0,
    },
  });

  const submit = useSubmit(endowId, onChange);

  const hideAdvancedOptions = methods.watch("hideAdvancedOptions");

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2 w-4/5 sm:text-lg font-normal font-body"
        onSubmit={methods.handleSubmit(submit)}
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
        <Split />

        <div className="flex gap-3">
          <BtnSec
            className="max-sm:mx-auto mt-8 w-40"
            onClick={() => methods.reset()}
          >
            Reset Changes
          </BtnSec>
          <BtnPrimary type="submit" className="max-sm:mx-auto mt-8 w-40">
            Update Snippet
          </BtnPrimary>
        </div>
      </form>
    </FormProvider>
  );
}
