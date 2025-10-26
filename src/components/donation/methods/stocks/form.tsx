import { valibotResolver } from "@hookform/resolvers/valibot";
import { TipField } from "components/donation/common/tip-field";
import { Field, Form as FormContainer } from "components/form";
import { ru_vdec } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { use_donation } from "../../context";
import {
  type StocksDonationDetails as FV,
  type TMethodState,
  stocks_donation_details,
  to_checkout,
} from "../../types";

export function Form(props: TMethodState<"stocks">) {
  const initial: FV = {
    num_shares: "",
    symbol: "",
    tip: "",
    tip_format: "15",
  };
  const { don_set } = use_donation();
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
      className="grid"
      onSubmit={handleSubmit((fv) => to_checkout("stocks", fv, don_set))}
    >
      <Field
        required
        {...register("symbol")}
        error={errors.symbol?.message}
        label="Symbol name of share"
        placeholder="Ex. AAPL"
        classes={{
          label: " font-semibold",
          input: "field-input-donate",
        }}
      />

      <Field
        required
        {...register("num_shares")}
        error={errors.num_shares?.message}
        label="Number of shares you are donating"
        placeholder="Enter quantity"
        classes={{
          container: "mt-6",
          label: " font-semibold",
          input: "field-input-donate",
        }}
      />

      <TipField
        classes="mt-6"
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
                placeholder="Enter tip"
                aria-invalid={!!errors.tip?.message}
              />
              <span className="right-6 text-xs text-red text-right absolute top-1/2 -translate-y-1/2 empty:hidden">
                {errors.tip?.message}
              </span>
            </div>
          ) : undefined
        }
      />

      <h4 className="mt-6 mb-2">Benefits of donating appreciated stock</h4>
      <p className="text-sm">
        You can enjoy significant tax advantages and maximize the size of your
        contributions when you transfer securities through Better Giving:
      </p>
      <div className="grid rounded-sm bg-gray-l5 dark:bg-gray-d3 p-2 my-4">
        <span className="text-sm text-gray">
          NOTE: This is not financial advice! Please speak to your tax advisor
          or broker about your specific situation and country's tax laws.
        </span>
      </div>
      <p className="text-sm">
        If you held the stock for at least one year, you receive a tax deduction
        for the full value of the stock at the time of donation (not just the
        amount you paid for the stock).
      </p>
      <p className="text-sm mt-4">
        You avoid paying both capital gains tax and stock sales commissions.
        When you give appreciated stocks directly to a nonprofit, your gift can
        be up to 20% larger because you avoid the taxes you'd incur from selling
        and donating the cash.
      </p>
      <button
        disabled={isSubmitting}
        className="mt-6 btn btn-blue text-sm enabled:bg-(--accent-primary)"
        type="submit"
      >
        Continue
      </button>
    </FormContainer>
  );
}
