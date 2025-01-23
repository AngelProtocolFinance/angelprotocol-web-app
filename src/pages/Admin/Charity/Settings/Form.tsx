import type { EndowUpdate } from "@better-giving/endowment";
import {
  MAX_RECEIPT_MSG_CHAR,
  incrementLabelMaxChars,
} from "@better-giving/endowment/schema";
import { Field as HuiField, Input, Textarea } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Outlet, useFetcher } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { DonateMethods, fill } from "components/DonateMethods";
import Increments from "components/Increments";
import {
  NativeCheckField as CheckField,
  Form as F,
  NativeField as Field,
} from "components/form";
import { GoalSelector } from "components/goal-selector";
import { BG_ID } from "constants/common";
import { useActionResult } from "hooks/use-action-result";
import { DollarSign } from "lucide-react";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ActionData } from "types/action";
import type { LoaderData } from "./api";
import { toFormTarget, toTarget } from "./helpers";
import { type FV, schema } from "./types";

export { loader, action } from "./api";
export { clientLoader } from "api/cache";
export { ErrorBoundary } from "components/error";
export default function Form() {
  const endow = useCachedLoaderData<LoaderData>();

  const fetcher = useFetcher<ActionData>();
  useActionResult(fetcher.data);

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
      receiptMsg: endow.receiptMsg ?? "",
      hide_bg_tip: endow.hide_bg_tip ?? false,
      programDonateDisabled: !(endow.progDonationsAllowed ?? true),
      donateMethods: fill(endow.donateMethods),
      increments: endow.increments ?? [],
      fundOptIn: endow.fund_opt_in ?? true,
      target: toFormTarget(endow.target),
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

  const receipMsg = watch("receiptMsg");
  const incs = watch("increments");

  return (
    <F
      disabled={isSubmitting || fetcher.state !== "idle"}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      onSubmit={handleSubmit(
        async ({
          programDonateDisabled,
          donateMethods,
          fundOptIn,
          target: fvTarget,
          ...fv
        }) => {
          if (endow.id === BG_ID && fv.hide_bg_tip === false) {
            return toast.error(
              "BG donation flow should not show BG tip screen"
            );
          }
          const update: EndowUpdate = {
            ...fv,
            fund_opt_in: fundOptIn,
            target: toTarget(fvTarget),
            progDonationsAllowed: !programDonateDisabled,
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
      )}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6"
    >
      <div>
        <Field
          {...register("receiptMsg")}
          rows={5}
          type="textarea"
          classes={{
            container: "field-admin [&_[data-error]]:-bottom-4",
            label: "text-base font-medium",
          }}
          label="Tax Receipt message for donors"
          placeholder="Your nonprofit's message to all donors"
          error={errors.receiptMsg?.message}
        />
        <p
          data-exceed={receipMsg.length > MAX_RECEIPT_MSG_CHAR}
          className="text-xs text-navy-l1 data-[exceed='true']:text-red"
        >
          {receipMsg.length}/{MAX_RECEIPT_MSG_CHAR}
        </p>
        <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
          This is an optional message that can be included on all tax receipts
          to your donors to add a personalized touch, a thank you, or a call to
          action.
        </p>
      </div>

      <div>
        <CheckField
          {...register("programDonateDisabled")}
          classes={{ label: "font-medium" }}
        >
          Disable Program-based donations
        </CheckField>
        <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
          Program-based donations are allowed by default, enabling donors to
          select a specifc Program they wish to put their donation towards. You
          may opt-in or out of Program-based donations at any time.
        </p>
      </div>

      <div className="grid gap-2">
        <CheckField {...register("hide_bg_tip")} classes="font-medium">
          Opt out of Support Contribution Model
        </CheckField>
        <span className="text-xs sm:text-sm italic text-navy-l1">
          During the donation flow, there is a step in which users can choose to
          support Better Giving by contributing any amount they desire alongside
          their donation to you - the amount they contribute will not affect the
          donation amount you receive. You may choose to turn this step off in
          the donation flow by ticking the checkbox above and we will instead
          apply a fixed 1.5% fee to any donation amount you receive.
        </span>
      </div>

      <div>
        <CheckField {...register("fundOptIn")} classes="font-medium">
          Allow Fundraisers to be created on behalf of your nonprofit
        </CheckField>
        <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
          Fundraising functionality is optional for all Better Giving
          nonprofits. By opting in, people will be able to create fundraisers on
          your behalf. You will receive 100% of funds raised for fundraisers
          specific to your organization, and a percentage split of fundraisers
          involving multiple nonprofits (such as curated giving indexes).
        </p>
      </div>

      <h5 className="mt-12 text-2xl">Marketplace settings</h5>

      <DonateMethods
        classes={{
          container: "mt-8",
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
                  className="text-navy-l1 absolute top-1/2 left-2 transform -translate-y-1/2"
                />
                <Input
                  type="number"
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
                {...register(`increments.${idx}.label`)}
                rows={2}
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
          className="px-6 btn-outline-filled text-sm"
          disabled={!isDirty}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="px-6 btn-blue text-sm"
          disabled={!isDirty}
        >
          Submit changes
        </button>
      </div>
      <Outlet />
    </F>
  );
}
