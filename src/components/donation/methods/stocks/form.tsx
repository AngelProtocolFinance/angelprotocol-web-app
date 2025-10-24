import { yupResolver } from "@hookform/resolvers/yup";
import { Field, Form as FormContainer } from "components/form";
import { useForm } from "react-hook-form";
import { schema, str_num } from "schemas/shape";
import { requiredString } from "schemas/string";
import { ContinueBtn } from "../../common/continue-btn";
import { use_donation_state } from "../../context";
import {
  type StocksDonationDetails as FV,
  type TMethodState,
  to_checkout,
} from "../../types";

export function Form(props: TMethodState<"stocks">) {
  const initial: FV = {
    num_shares: "",
    symbol: "",
    first_name: "",
    last_name: "",
    email: "",
    tip: "",
    tip_format: "15",
    cover_processing_fee: false,
  };
  const { set_state } = use_donation_state();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: props.fv || initial,
    resolver: yupResolver(
      schema<FV>({
        symbol: requiredString.trim(),
        num_shares: str_num(
          (s) => s.required("required"),
          (n) => n.positive("must be greater than 0")
        ),
      })
    ),
  });

  return (
    <FormContainer
      className="grid"
      onSubmit={handleSubmit((fv) => to_checkout("stocks", fv, set_state))}
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
