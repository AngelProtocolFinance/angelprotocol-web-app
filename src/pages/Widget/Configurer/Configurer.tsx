import { incrementLabelMaxChars } from "@better-giving/endowment/schema";
import { Field as HuiField, Input, Textarea } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { DonateMethods } from "components/DonateMethods";
import Increments from "components/Increments";
import { ProgramSelector } from "components/donation";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
} from "components/form";
import { DollarSign } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import {
  type SubmitHandler,
  useController,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { type WidgetConfig, widgetConfig } from "types/widget";
import { EndowmentSelector } from "./EndowmentSelector";
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
  const {
    handleSubmit,
    reset: hookFormReset,
    formState: { isDirty, errors, isSubmitting },
    setValue,
    watch,
    register,
    control,
  } = useForm<FormValues>({
    resolver: valibotResolver(widgetConfig),
    //set new config as default, so user would need to make a change to be able to update again
    values: config,
  });

  const { field: donateMethods } = useController({
    control: control,
    name: "methods",
  });

  const { field: program } = useController({
    control: control,
    name: "program",
  });

  const increments = useFieldArray({
    control,
    name: "increments",
  });

  const { field: endowment } = useController({
    control: control,
    name: "endowment",
  });

  const isDescriptionTextShown = watch("isDescriptionTextShown");
  const isTitleShown = watch("isTitleShown");
  const incs = watch("increments");

  const submit: SubmitHandler<FormValues> = async (fv) => {
    setConfig(fv);
  };

  return (
    <Form
      disabled={isSubmitting}
      className={`${classes} @container/configurer`}
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
        <EndowmentSelector
          onChange={endowment.onChange}
          value={endowment.value}
          error={errors.endowment?.id?.message}
        />

        {programDonationAllowed && (
          <ProgramSelector
            classes={{ container: "mt-6", label: "text-base font-medium" }}
            onChange={program.onChange}
            program={program.value}
            endowId={config.endowment.id}
          />
        )}

        <Field
          {...register("title")}
          type="textarea"
          label="Custom title"
          classes={{ container: "mt-8", label: "font-medium text-base" }}
          disabled={!isTitleShown}
          error={errors.title?.message}
        />

        <CheckField
          {...register("isTitleShown")}
          classes="mt-3"
          onChange={(checked) => !checked && setValue("title", "")}
        >
          Show title
        </CheckField>

        <Field
          {...register("description")}
          type="textarea"
          label="Custom description"
          classes={{ container: "mt-8", label: "font-medium text-base" }}
          disabled={!isDescriptionTextShown}
          error={errors.description?.message}
        />
        <CheckField
          {...register("isDescriptionTextShown")}
          classes="mt-4"
          onChange={(checked) => !checked && setValue("description", "")}
        >
          Show description
        </CheckField>

        <DonateMethods
          classes={{
            container: "mt-16",
            tooltip: "italic",
            label: "font-medium text-base",
          }}
          values={donateMethods.value}
          onChange={donateMethods.onChange}
          error={
            <p className="text-red text-sm mb-1 empty:hidden">
              {errors.methods?.message}
            </p>
          }
        />

        <p className="font-bold text-base mt-8">Style settings</p>
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

        <Increments
          classes="mt-8 mb-10"
          fields={increments.fields}
          onAdd={(val) => {
            if (increments.fields.length >= 4) {
              return alert("You can only have 4 increments");
            }
            increments.append({ value: val, label: "" });
          }}
          onRemove={(idx) => increments.remove(idx)}
          countError={errors.increments?.root?.message}
          field={(idx) => (
            <>
              <HuiField className="grid grid-rows-subgrid row-span-2">
                <div className="relative w-full">
                  <DollarSign
                    size={14}
                    className="text-navy-l1 absolute top-1/2 left-3 -translate-y-1/2"
                  />
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...register(`increments.${idx}.value`)}
                    className="w-full h-full font-heading outline-blue-d1 rounded text-sm font-medium bg-transparent pl-8 pr-4 py-3.5 placeholder:text-navy-l3 text-navy-d4 border border-gray-l3 disabled:pointer-events-none disabled:bg-gray-l5 disabled:text-navy-l1"
                  />
                </div>
                <p className="mt-1 empty:hidden text-left text-xs text-red">
                  {errors.increments?.[idx]?.value?.message}
                </p>
              </HuiField>
              <HuiField className="grid grid-rows-subgrid row-span-2">
                <Textarea
                  rows={2}
                  {...register(`increments.${idx}.label`)}
                  className="w-full font-heading outline-blue-d1 rounded text-sm font-medium bg-transparent px-4 py-3.5 placeholder:text-navy-l3 text-navy-d4 border border-gray-l3 disabled:pointer-events-none disabled:bg-gray-l5 disabled:text-navy-l1"
                />
                <p
                  data-error={!!errors.increments?.[idx]?.label?.message}
                  className="mt-1 text-left text-xs data-[error='true']:text-red"
                >
                  {incs[idx].label.length}/{incrementLabelMaxChars}
                </p>
              </HuiField>
            </>
          )}
        />

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
