import { $, MAX_RECEIPT_MSG_CHAR } from "@better-giving/endowment/schema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { CheckField, Form as F, Field } from "components/form";
import { use_action_result } from "hooks/use-action-result";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router";
import type { ActionData } from "types/action";
import * as v from "valibot";

const schema = v.object({
  receiptMsg: v.pipe(
    $,
    v.maxLength(
      MAX_RECEIPT_MSG_CHAR,
      ({ requirement }) => `cannot exceed ${requirement} characters`
    )
  ),
  hide_bg_tip: v.boolean(),
});

type FV = v.InferInput<typeof schema>;

interface Props {
  receiptMsg: string;
  hide_bg_tip: boolean;
}

export function DonationTab({ receiptMsg, hide_bg_tip }: Props) {
  const fetcher = useFetcher<ActionData>();
  use_action_result(fetcher.data);

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    watch,
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    values: {
      receiptMsg: receiptMsg ?? "",
      hide_bg_tip: hide_bg_tip ?? false,
    },
  });

  const receipMsg = watch("receiptMsg");

  const onSubmit = handleSubmit(async (fv) => {
    fetcher.submit(fv as any, {
      method: "POST",
      action: ".",
      encType: "application/json",
    });
  });

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
      <div className="relative">
        <Field
          {...register("receiptMsg")}
          rows={5}
          type="textarea"
          classes={{
            label: "text-base font-medium",
          }}
          label="Tax Receipt message for donors"
          placeholder="Your nonprofit's message to all donors"
        />
        <p
          data-exceed={receipMsg.length > MAX_RECEIPT_MSG_CHAR}
          className="text-xs text-gray data-[exceed='true']:text-red flex justify-between"
        >
          <span>
            {receipMsg.length}/{MAX_RECEIPT_MSG_CHAR}
          </span>
          <span className="text-red text-xs">
            {errors.receiptMsg?.message ?? ""}
          </span>
        </p>
        <p className="text-xs sm:text-sm text-gray italic mt-1">
          This is an optional message that can be included on all tax receipts
          to your donors to add a personalized touch, a thank you, or a call to
          action.
        </p>
      </div>

      <div className="grid gap-2">
        <CheckField {...register("hide_bg_tip")} classes="font-medium">
          Opt out of Support Contribution Model
        </CheckField>
        <span className="text-xs sm:text-sm italic text-gray">
          In the donation form, there is a section in which users can choose to
          support Better Giving by contributing any amount they desire alongside
          their donation to you - the amount they contribute will not affect the
          donation amount you receive. You may choose to turn this step off in
          the donation flow by ticking the checkbox above and we will instead
          apply a fixed 1.5% fee to any donation amount you receive.
        </span>
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
