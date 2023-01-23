import { FormProvider } from "react-hook-form";
import Checkbox from "components/Checkbox";
import { BtnPrimary } from "components/donation";
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

        <BtnPrimary
          className="max-sm:mx-auto mt-8 w-40"
          onClick={() => methods.reset()}
        >
          Reset Changes
        </BtnPrimary>
      </div>
    </FormProvider>
  );
}
