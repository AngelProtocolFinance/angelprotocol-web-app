import { increment_label_max_chars } from "@better-giving/schemas";
import { Field as HuiField, Input, Label, Textarea } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { DollarSign } from "lucide-react";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { widget_config } from "types/widget";
import { DonateMethods } from "../donate-methods";
import { Field, Form } from "../form";
import { GoalSelector } from "../goal-selector";
import { Increments } from "../increments";
import type { FV } from "./types";

interface Props extends FV {
  classes?: string;
  on_submit: (fv: FV) => void;
}
export function FormEditor({ classes = "", on_submit, ...fv }: Props) {
  const {
    handleSubmit,
    reset: hookFormReset,
    formState: { isDirty, errors, isSubmitting },
    watch,
    register,
    control,
  } = useForm<FV>({
    resolver: valibotResolver(widget_config),
    //set new config as default, so user would need to make a change to be able to update again
    values: fv,
  });

  const { field: donateMethods } = useController({
    control: control,
    name: "methods",
  });

  const increments = useFieldArray({
    control,
    name: "increments",
  });

  const { field: target } = useController({
    control,
    name: "target.type",
  });

  const incs = watch("increments");

  return (
    <Form
      disabled={isSubmitting}
      className={`${classes} @container/configurer`}
      onSubmit={handleSubmit((x) => on_submit(x))}
      onReset={(e) => {
        e.preventDefault();
        hookFormReset();
      }}
    >
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Donation Form Builder
      </h2>

      <div className="grid content-start text-sm">
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
            {...register("accent_primary")}
          />
          <label htmlFor="__accent-prim"> Accent primary</label>
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

        <HuiField>
          <Label className="font-bold mb-3">Donation goal</Label>
          <GoalSelector value={target.value} onChange={target.onChange} />
          {target.value === "fixed" && (
            <Field
              {...register("target.value", { shouldUnregister: true })}
              label="How much money do you want to raise?"
              classes="mt-4 mb-6"
              placeholder="$"
              error={errors?.target?.value?.message}
            />
          )}
        </HuiField>

        <div className="flex gap-3 w-full @max-xl/configurer:justify-center mt-8">
          <button
            disabled={!isDirty}
            type="reset"
            className="btn-outline btn @max-sm/configurer:mx-auto w-40"
          >
            Reset Changes
          </button>
          <button
            disabled={!isDirty}
            type="submit"
            className="btn btn-blue @max-sm/configurer:mx-auto w-40"
          >
            {isSubmitting ? "Updating.." : "Update Form"}
          </button>
        </div>
      </div>
    </Form>
  );
}
