import { yupResolver } from "@hookform/resolvers/yup";
import { Field } from "components/form";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { requiredString } from "schemas/string";
import { StockFormStep, setDetails } from "slices/donation";
import { object } from "yup";

export default function Form(props: StockFormStep) {
  const dispatch = useDispatch();

  const methods = useForm({
    defaultValues: props.details
      ? {
          symbol: props.details.symbol,
          numShares: props.details.numShares.toString(),
        }
      : {
          symbol: "",
          numShares: "",
        },
    resolver: yupResolver(
      object({
        symbol: requiredString.trim(),
        numShares: requiredString.trim().matches(/^[1-9]\d*$/, "invalid"),
      })
    ),
  });

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  return (
    <FormProvider {...methods}>
      <form
        className="grid"
        onSubmit={methods.handleSubmit((fv) => {
          dispatch(
            setDetails({
              method: "stocks",
              symbol: fv.symbol,
              numShares: +fv.numShares,
            })
          );
        })}
      >
        <Field<FV>
          required
          name="symbol"
          label="Stock symbol (Ticker)"
          placeholder="AAPL"
          classes={{ label: "font-semibold" }}
        />

        <Field<FV>
          required
          name="numShares"
          label="Number of Shares to donate"
          classes={{
            label: "font-semibold",
            container: "mt-4",
            error: "left-0",
          }}
        />

        <h4 className="mt-6 mb-2">Benefits of donating appreciated stock</h4>
        <p className="text-sm">
          You can enjoy significant tax advantages and maximize the size of your
          contributions when you transfer securities through Better.Giving:
        </p>
        <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-2 my-4">
          <span className="text-sm text-gray">
            NOTE: This is not financial advice! Please speak to your tax advisor
            or broker about your specific situation and country's tax laws.
          </span>
        </div>
        <p className="text-sm">
          If you held the stock for at least one year, you receive a tax
          deduction for the full value of the stock at the time of donation (not
          just the amount you paid for the stock).
        </p>
        <p className="text-sm mt-4">
          You avoid paying both capital gains tax and stock sales commissions.
          When you give appreciated stocks directly to a nonprofit, your gift
          can be up to 20% larger because you avoid the taxes you'd incur from
          selling and donating the cash.
        </p>
        <button
          disabled={methods.formState.isSubmitting}
          className="btn-orange btn-donate mt-6"
          type="submit"
        >
          Continue
        </button>
      </form>
    </FormProvider>
  );
}
