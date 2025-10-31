import type { DonateMethodId, INpoUpdate } from "@better-giving/endowment";
import { increment_label_max_chars } from "@better-giving/schemas";
import { MAX_NUM_INCREMENTS, increment } from "@better-giving/schemas";
import { Field as HuiField, Input, Textarea } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { DonateMethods, fill } from "components/donate-methods";
import { Form as F, Field } from "components/form";
import {
  GoalSelector,
  target,
  to_form_target,
  to_target,
} from "components/goal-selector";
import { Increments } from "components/increments";
import { use_action_result } from "hooks/use-action-result";
import { DollarSign } from "lucide-react";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { useFetcher } from "react-router";
import type { ActionData } from "types/action";
import { type TDonateMethod, donate_method } from "types/components";
import * as v from "valibot";

const schema = v.object({
  increments: v.pipe(
    v.array(increment),
    v.maxLength(
      MAX_NUM_INCREMENTS,
      ({ requirement }) => `cannot have more than ${requirement} increments`
    )
  ),
  donateMethods: v.pipe(
    v.array(donate_method),
    v.filterItems((m) => !m.disabled),
    v.minLength(1, "at least one payment option should be active")
  ),
  target,
});

type FV = v.InferInput<typeof schema>;

interface Props {
  donate_methods: DonateMethodId[];
  increments: { label: string; value: string }[];
  target: string | undefined;
}

export function DonationFormTab(p: Props) {
  const fetcher = useFetcher<ActionData>();
  use_action_result(fetcher.data);

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    control,
    watch,
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    values: {
      donateMethods: fill(p.donate_methods),
      increments: p.increments,
      target: to_form_target(p.target),
    },
  });

  const { field: donateMethods } = useController({
    control,
    name: "donateMethods",
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

  const onSubmit = handleSubmit(
    async ({ donateMethods, target: fvTarget, ...fv }) => {
      const update: Partial<INpoUpdate> = {
        ...fv,
        target: to_target(fvTarget),
        donateMethods: donateMethods
          .filter((m) => !m.disabled)
          .map((m) => m.id),
      };

      fetcher.submit(update as any, {
        method: "POST",
        action: ".",
        encType: "application/json",
      });
    }
  );

  return (
    <F
      disabled={isSubmitting || fetcher.state !== "idle"}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      onSubmit={onSubmit}
      className="grid content-start gap-6"
    >
      <DonateMethods
        classes={{
          container: "mt-2",
          label: "font-medium",
          tooltip: "italic text-sm",
        }}
        values={donateMethods.value}
        onChange={donateMethods.onChange}
        error={
          <ErrorMessage
            name="donateMethods"
            as="p"
            errors={errors}
            className="text-red text-sm mb-1"
          />
        }
      />

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
                  size={15}
                  className="text-gray absolute top-1/2 left-2 transform -translate-y-1/2"
                />
                <Input
                  type="number"
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
                {...register(`increments.${idx}.label`)}
                rows={2}
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

      <div>
        <p className="font-bold mb-3">Donation goal</p>
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
      </div>

      <div className="flex gap-3 mt-8">
        <button
          type="reset"
          className="px-6 btn-outline btn text-sm"
          disabled={!isDirty}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="px-6 btn btn-blue text-sm"
          disabled={!isDirty}
        >
          Submit changes
        </button>
      </div>
    </F>
  );
}
