import { yupResolver } from "@hookform/resolvers/yup";
import { LockedSplitSlider } from "components/donation/Steps/Splits";
import { CheckField, Form } from "components/form";
import { type SubmitHandler, useController, useForm } from "react-hook-form";
import type { WidgetConfig } from "types/widget";
import EndowmentSelector from "./EndowmentSelector";
import { schema } from "./schema";
import type { FormValues } from "./types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  classes?: string;
  config: WidgetConfig;
  setConfig: Dispatch<SetStateAction<WidgetConfig>>;
};

export default function Configurer({ classes = "", config, setConfig }: Props) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    //set new config as default, so user would need to make a change to be able to update again
    values: config,
  });

  const submit: SubmitHandler<FormValues> = (fv) => setConfig(fv);

  const {
    handleSubmit,
    reset: hookFormReset,
    formState: { isDirty },
  } = methods;

  const {
    field: { onChange, value },
  } = useController({
    control: methods.control,
    name: "liquidSplitPct",
  });

  return (
    <Form
      className={`${classes} @container/configurer`}
      methods={methods}
      onSubmit={handleSubmit(submit)}
      onReset={(e) => {
        e.preventDefault();
        hookFormReset();
      }}
    >
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Donation Form Builder
      </h2>

      <div className="grid content-start gap-6 text-sm">
        <label className="-mb-4">Nonprofit name:</label>
        <EndowmentSelector />

        <CheckField<FormValues> name="isDescriptionTextShown">
          Show description text
        </CheckField>

        <label className="-mb-4">Define default split value:</label>
        <LockedSplitSlider
          value={100 - value}
          onChange={(lockedPct) => onChange(100 - lockedPct)}
        />

        <CheckField<FormValues> name="splitDisabled" classes="mt-4">
          Disable changing the split value
        </CheckField>

        <div className="flex gap-3 w-full @max-xl/configurer:justify-center mt-4">
          <button
            disabled={!isDirty}
            type="reset"
            className="btn-outline-filled @max-sm/configurer:mx-auto w-40"
          >
            Reset Changes
          </button>
          <button
            disabled={!isDirty}
            type="submit"
            className="btn-blue @max-sm/configurer:mx-auto w-40"
          >
            Update Snippet
          </button>
        </div>
      </div>
    </Form>
  );
}
