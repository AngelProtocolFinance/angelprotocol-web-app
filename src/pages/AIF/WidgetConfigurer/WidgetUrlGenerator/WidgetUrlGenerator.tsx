import { FormProvider, useForm } from "react-hook-form";
import Checkbox from "components/Checkbox";
import Split from "components/Split";
import { BtnPrimary, BtnSec } from "components/donation";
import DenomSelector from "./DenomSelector";
import { FormValues } from "./schema";

type Props = { onChange(formValues: FormValues): void };

const DEFAULT_VALUES: FormValues = {
  availCurrOpts: [],
  hideText: false,
  hideAdvOpts: false,
  unfoldAdvOpts: false,
  liquidPct: 0,
};

export default function WidgetUrlGenerator({ onChange }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const hideAdvOpts = methods.watch("hideAdvOpts");

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2 xl:w-4/5 text-sm font-normal font-body"
        onSubmit={methods.handleSubmit(onChange)}
      >
        <Checkbox<FormValues> name="hideText">Hide text</Checkbox>

        <span>Available currencies:</span>
        <DenomSelector />

        <Checkbox<FormValues> name="hideAdvOpts">
          Hide "advanced options"
        </Checkbox>

        <Checkbox<FormValues>
          name="unfoldAdvOpts"
          disabled={hideAdvOpts}
          classes={{ label: "peer-disabled:text-gray" }}
        >
          Unfold "advanced options" by default
        </Checkbox>

        <span>Define split value by default:</span>
        <Split<FormValues, "liquidPct", never>
          className="mb-6"
          liqPctField="liquidPct"
        />

        <div className="flex gap-3 w-full max-xl:justify-center mt-8">
          <BtnSec
            className="w-40"
            onClick={() => {
              methods.reset();
              onChange(DEFAULT_VALUES);
            }}
          >
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
