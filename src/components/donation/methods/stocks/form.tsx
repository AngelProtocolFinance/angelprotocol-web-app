import { valibotResolver } from "@hookform/resolvers/valibot";
import { TipField } from "components/donation/common/tip-field";
import { Field, Form as FormContainer } from "components/form";
import { ru_vdec } from "helpers/decimal";
import { ChevronDown, LightbulbIcon } from "lucide-react";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { use_donation } from "../../context";
import {
  type StocksDonationDetails as FV,
  type TMethodState,
  stocks_donation_details,
  to_checkout,
} from "../../types";

export function Form(props: TMethodState<"stocks">) {
  const [tip_expanded, set_tip_expanded] = useState(false);
  const { don_set, don } = use_donation();
  const initial: FV = {
    num_shares: "",
    symbol: "",
    tip: "",
    tip_format: don.recipient.hide_bg_tip ? "none" : "15",
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: props.fv || initial,
    criteriaMode: "all",
    resolver: valibotResolver(stocks_donation_details),
  });

  const { field: tip_format } = useController({
    name: "tip_format",
    control,
  });

  return (
    <FormContainer
      className="grid gap-y-2"
      onSubmit={handleSubmit((fv) => to_checkout("stocks", fv, don_set))}
    >
      <Field
        required
        {...register("symbol")}
        error={errors.symbol?.message}
        label="Symbol name of share"
        placeholder="Ex. AAPL"
        classes={{
          label: "font-semibold",
        }}
      />

      <Field
        required
        {...register("num_shares")}
        error={errors.num_shares?.message}
        label="Number of shares you are donating"
        placeholder="Enter quantity"
        classes={{
          container: "mt-2",
          label: "font-semibold",
        }}
        inputMode="decimal"
      />

      {don.recipient.hide_bg_tip ? null : (
        <TipField
          classes="mt-2"
          checked={tip_format.value !== "none"}
          checked_changed={(checked) => {
            if (checked) {
              tip_format.onChange("15");
            } else {
              tip_format.onChange("none");
              setValue("tip", "");
            }
          }}
          tip_format={tip_format.value}
          tip_format_changed={async (format) => {
            tip_format.onChange(format);
            if (format === "none") {
              return setValue("tip", "");
            }
            if (format === "custom") {
              await new Promise((r) => setTimeout(r, 50));
              return setFocus("tip");
            }

            const amnt = getValues("num_shares");
            if (!amnt) return setValue("tip", "");

            const v = (+format / 100) * +amnt;
            setValue("tip", ru_vdec(v, 1));
          }}
          custom_tip={
            tip_format.value === "custom" ? (
              <div className="relative w-full">
                <input
                  {...register("tip")}
                  type="number"
                  step="any"
                  className="w-full text-sm pl-2 focus:outline-none"
                  placeholder="Enter contribution amount"
                  aria-invalid={!!errors.tip?.message}
                />
                <span className="right-6 text-xs text-red text-right absolute top-1/2 -translate-y-1/2 empty:hidden">
                  {errors.tip?.message}
                </span>
              </div>
            ) : undefined
          }
        />
      )}

      <div className="mt-4 flex items-center gap-x-1">
        <LightbulbIcon
          size={16}
          className="stroke-amber self-start h-[1lh] shrink-0"
        />
        <h4 className="tex-sm text-gray-d1 font-medium">
          Benefits of donating appreciated stock
        </h4>
      </div>
      <p className={`text-sm ${tip_expanded ? "" : "mask-b-from-1 pb-2"}`}>
        You can enjoy significant tax advantages and maximize the size of your
        contributions when you transfer securities through Better Giving:
      </p>
      {!tip_expanded && (
        <button
          onClick={() => set_tip_expanded(true)}
          type="button"
          className="flex items-center -mt-4 justify-self-start text-[13px] text-blue-d1"
        >
          read more <ChevronDown size={16} />
        </button>
      )}
      {tip_expanded && (
        <div className="grid rounded-sm bg-gray-l5 dark:bg-gray-d3 p-2 my-2">
          <span className="text-sm text-gray">
            NOTE: This is not financial advice! Please speak to your tax advisor
            or broker about your specific situation and country's tax laws.
          </span>
        </div>
      )}
      {tip_expanded && (
        <p className="text-sm">
          If you held the stock for at least one year, you receive a tax
          deduction for the full value of the stock at the time of donation (not
          just the amount you paid for the stock).
        </p>
      )}
      {tip_expanded && (
        <p className="text-sm mt-2">
          You avoid paying both capital gains tax and stock sales commissions.
          When you give appreciated stocks directly to a nonprofit, your gift
          can be up to 20% larger because you avoid the taxes you'd incur from
          selling and donating the cash.
        </p>
      )}
      <button
        disabled={isSubmitting}
        className="mt-4 btn btn-blue text-sm enabled:bg-(--accent-primary)"
        type="submit"
      >
        Continue
      </button>
    </FormContainer>
  );
}
