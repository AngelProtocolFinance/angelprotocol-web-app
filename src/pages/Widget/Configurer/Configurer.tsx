import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { DonateMethods } from "components/DonateMethods";
import { LockedSplitSlider, ProgramSelector } from "components/donation";
import { CheckField, Field, Form } from "components/form";
import type { Dispatch, SetStateAction } from "react";
import { type SubmitHandler, useController, useForm } from "react-hook-form";
import type { WidgetConfig } from "types/widget";
import EndowmentSelector from "./EndowmentSelector";
import Increments from "./Increments";
import { schema } from "./schema";
import type { FormValues } from "./types";

type Props = {
  classes?: string;
  config: WidgetConfig;
  setConfig: Dispatch<SetStateAction<WidgetConfig>>;
  programDonationAllowed?: boolean;
};

export default function Configurer({
  classes = "",
  config,
  setConfig,
  programDonationAllowed,
}: Props) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    //set new config as default, so user would need to make a change to be able to update again
    values: config,
  });

  const {
    handleSubmit,
    reset: hookFormReset,
    resetField,
    formState: { isDirty, errors, isSubmitting },
    setValue,
    watch,
    register,
  } = methods;

  const { field: liquidSplitPct } = useController({
    control: methods.control,
    name: "liquidSplitPct",
  });

  const { field: donateMethods } = useController({
    control: methods.control,
    name: "methods",
  });

  const { field: program } = useController({
    control: methods.control,
    name: "program",
  });

  const isDescriptionTextShown = watch("isDescriptionTextShown");
  const isTitleShown = watch("isTitleShown");

  const submit: SubmitHandler<FormValues> = async (fv) => {
    setConfig(fv);
  };

  return (
    <Form
      disabled={isSubmitting}
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

      <div className="grid content-start text-sm">
        <label className="mt-2 mb-2 font-medium text-base">
          Nonprofit name:
        </label>
        <EndowmentSelector />

        {programDonationAllowed && (
          <ProgramSelector
            classes={{ container: "mt-6", label: "text-base font-medium" }}
            onChange={program.onChange}
            program={program.value}
            endowId={config.endowment.id}
          />
        )}

        <Field<FormValues, "textarea">
          type="textarea"
          name="title"
          label="Custom title"
          classes={{ container: "mt-8", label: "font-medium text-base" }}
          disabled={!isTitleShown}
        />
        <CheckField<FormValues>
          name="isTitleShown"
          classes="mt-3"
          onChange={(checked) => !checked && setValue("title", "")}
        >
          Show title
        </CheckField>

        <Field<FormValues, "textarea">
          type="textarea"
          name="description"
          label="Custom description"
          classes={{ container: "mt-8", label: "font-medium text-base" }}
          disabled={!isDescriptionTextShown}
        />
        <CheckField<FormValues>
          name="isDescriptionTextShown"
          classes="mt-4"
          onChange={(checked) => !checked && setValue("description", "")}
        >
          Show description
        </CheckField>

        <label className="mt-12 mb-4 font-medium text-base">
          Define default split value:
        </label>
        <LockedSplitSlider
          value={100 - liquidSplitPct.value}
          onChange={(lockedPct) => liquidSplitPct.onChange(100 - lockedPct)}
        />

        <div className="mt-6">
          <CheckField<FormValues> name="splitDisabled">
            Disable changing the split value
          </CheckField>
          <p className="text-xs @4xl/widget:text-sm italic text-navy-l1 mt-2">
            Disabling the Split Value means donors will not be able to change it
            from the default set on the slider above. Checking this box will
            hide the split screen entirely.
          </p>
        </div>

        <DonateMethods
          classes={{
            container: "mt-16",
            tooltip: "italic",
            label: "font-medium text-base",
          }}
          values={donateMethods.value}
          onChange={donateMethods.onChange}
          error={
            <ErrorMessage
              name="methods"
              as="p"
              errors={errors}
              className="text-red text-sm mb-1"
            />
          }
        />

        <h4 className="font-bold text-base mt-8">Style settings</h4>
        <div className="flex items-center gap-2 mt-3">
          <input
            id="__accent-prim"
            type="color"
            {...register("accentPrimary")}
          />
          <label htmlFor="__accent-prim"> Accent primary</label>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            id="__accent-sec"
            type="color"
            {...register("accentSecondary")}
          />
          <label htmlFor="__accent-sec">Accent secondary</label>
        </div>

        <Increments classes="mt-8 mb-10" />

        <div className="flex gap-3 w-full @max-xl/configurer:justify-center mt-8">
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
            {isSubmitting ? "Updating.." : "Update Form"}
          </button>
        </div>
      </div>
    </Form>
  );
}
