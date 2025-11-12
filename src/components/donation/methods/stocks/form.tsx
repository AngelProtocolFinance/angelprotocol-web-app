import { valibotResolver } from "@hookform/resolvers/valibot";
import { MethodBenefits } from "components/donation/common/method-benefits";
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

      <MethodBenefits subject="stock" classes="mt-4" />
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
