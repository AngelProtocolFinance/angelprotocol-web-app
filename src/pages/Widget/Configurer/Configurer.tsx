import { yupResolver } from "@hookform/resolvers/yup";
import { SplitSlider } from "components/donation/Steps/Splits";
import { CheckField, Form } from "components/form";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { resetWidgetConfig, updateWidgetConfig } from "slices/widget";
import { useGetter, useSetter } from "store/accessors";
import { WidgetConfig } from "types/widget";
import EndowmentSelector from "./EndowmentSelector";
import { schema } from "./schema";
import { FormValues } from "./types";

export default function Configurer({ classes = "" }) {
  const widgetInitValues = useGetter((state) => state.widget);
  const dispatch = useSetter();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      endowment: widgetInitValues.endowment,
      isSplitFixed: widgetInitValues.isSplitFixed,
      liquidPercentage: widgetInitValues.liquidSplitPct,
    },
  });

  const submit: SubmitHandler<FormValues> = async (fv) => {
    const newConfig: WidgetConfig = {
      endowment: fv.endowment,
      isSplitFixed: fv.isSplitFixed,
      liquidSplitPct: fv.liquidPercentage,
    };
    dispatch(updateWidgetConfig(newConfig));
  };

  const { handleSubmit, reset: hookFormReset } = methods;

  const {
    field: { onChange, value },
  } = useController({
    control: methods.control,
    name: "liquidPercentage",
  });

  return (
    <Form
      className={classes + " @container/configurer"}
      methods={methods}
      onSubmit={handleSubmit(submit)}
      onReset={(e) => {
        e.preventDefault();
        dispatch(resetWidgetConfig());
        hookFormReset();
      }}
    >
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Donation Form Builder
      </h2>

      <div className="grid content-start gap-6 text-sm">
        <label className="-mb-4">Nonprofit name:</label>
        <EndowmentSelector />

        <label className="-mb-4">Define default split value:</label>
        <SplitSlider liquidSplitPct={value} setLiquidSplitPct={onChange} />

        <CheckField<FormValues> name="isSplitFixed" classes="mt-4">
          Disable changing the split value
        </CheckField>

        <div className="flex gap-3 w-full max-xl:justify-center mt-4">
          <button
            type="reset"
            className="btn-outline-filled max-sm:mx-auto w-40"
          >
            Reset Changes
          </button>
          <button type="submit" className="btn-blue max-sm:mx-auto w-40">
            Update Snippet
          </button>
        </div>
      </div>
    </Form>
  );
}
