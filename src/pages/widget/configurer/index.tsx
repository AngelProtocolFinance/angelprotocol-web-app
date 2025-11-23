import type { INpo } from "@better-giving/endowment";
import { increment_label_max_chars } from "@better-giving/schemas";
import { Field as HuiField, Input, Textarea } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { DonateMethods } from "components/donate-methods";
import { CheckField, Field, Form } from "components/form";
import { Increments } from "components/increments";
import { DollarSign } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useController, useFieldArray, useForm } from "react-hook-form";
import type { EndowmentOption } from "types/npo";
import { type IWidgetFv, widget_fv } from "types/widget";
import { EndowmentSelector } from "./endowment-selector";
import { ProgramSelector } from "./program-selector";

type Props = {
  classes?: string;
  endow?: INpo;
  endows: EndowmentOption[];
  fv: IWidgetFv;
  set_fv: Dispatch<SetStateAction<IWidgetFv>>;
};

export function Configurer({ classes = "", fv, set_fv, endow, endows }: Props) {
  const {
    handleSubmit,
    reset: hookFormReset,
    formState: { isDirty, errors, isSubmitting },
    setValue,
    watch,
    register,
    control,
  } = useForm<IWidgetFv>({
    resolver: valibotResolver(widget_fv),
    //set new config as default, so user would need to make a change to be able to update again
    values: fv,
  });

  const { field: donate_methods } = useController({
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

  const is_description_text_shown = watch("is_description_text_shown");
  const is_title_shown = watch("is_title_shown");
  const incs = watch("increments");

  return (
    <Form
      disabled={isSubmitting}
      className={`${classes} @container/configurer`}
      onSubmit={handleSubmit(set_fv)}
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
        <EndowmentSelector endow={endow} endows={endows} />

        {endow && (endow?.progDonationsAllowed ?? true) && (
          <ProgramSelector
            endowId={endow?.id}
            classes={{ container: "mt-6", label: "text-base font-medium" }}
            onChange={program.onChange}
            program={program.value}
          />
        )}

        <Field
          {...register("title")}
          type="textarea"
          label="Custom title"
          classes={{ container: "mt-8", label: "font-medium text-base" }}
          disabled={!is_title_shown}
          error={errors.title?.message}
        />

        <CheckField
          {...register("is_title_shown", {
            onChange(event) {
              if (!event.target.checked) {
                setValue("title", "");
              }
            },
          })}
          classes="mt-3"
        >
          Show title
        </CheckField>

        <Field
          {...register("description")}
          type="textarea"
          label="Custom description"
          classes={{ container: "mt-8", label: "font-medium text-base" }}
          disabled={!is_description_text_shown}
          error={errors.description?.message}
        />
        <CheckField
          {...register("is_description_text_shown", {
            onChange(event) {
              if (!event.target.checked) {
                setValue("description", "");
              }
            },
          })}
          classes="mt-4"
        >
          Show description
        </CheckField>

        <DonateMethods
          classes={{
            container: "mt-16",
            tooltip: "italic",
            label: "font-medium text-base",
          }}
          values={donate_methods.value}
          on_change={donate_methods.onChange}
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
            {...register("accent_primary")}
          />
          <label htmlFor="__accent-prim">Accent primary</label>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            id="__accent-sec"
            type="color"
            {...register("accent_secondary")}
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
                    className="text-gray absolute top-1/2 left-3 -translate-y-1/2"
                  />
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...register(`increments.${idx}.value`)}
                    className="w-full h-full  outline-blue-d1 rounded-sm text-sm font-medium bg-transparent pl-8 pr-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3 disabled:pointer-events-none disabled:bg-gray-l5 disabled:text-gray"
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
                  className="w-full  outline-blue-d1 rounded-sm text-sm font-medium bg-transparent px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3 disabled:pointer-events-none disabled:bg-gray-l5 disabled:text-gray"
                />
                <p
                  data-error={!!errors.increments?.[idx]?.label?.message}
                  className="mt-1 text-left text-xs data-[error='true']:text-red"
                >
                  {incs[idx].label.length}/{increment_label_max_chars}
                </p>
              </HuiField>
            </>
          )}
        />

        <div className="flex gap-3 w-full flex-wrap mt-8">
          <button
            disabled={!isDirty}
            type="reset"
            className="btn-outline btn w-40"
          >
            Reset Changes
          </button>
          <button
            disabled={!isDirty}
            type="submit"
            className="btn btn-blue w-40"
          >
            {isSubmitting ? "Updating.." : "Update Form"}
          </button>
        </div>
      </div>
    </Form>
  );
}
