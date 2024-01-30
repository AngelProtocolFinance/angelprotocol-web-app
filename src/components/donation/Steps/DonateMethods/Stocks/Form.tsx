import { yupResolver } from "@hookform/resolvers/yup";
import { Field } from "components/form";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { StockFormStep, setDetails } from "slices/donation";
import { object, string } from "yup";

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
        symbol: string().required("required"),
        numShares: string()
          .required("required")
          .matches(/^[1-9]\d*$/, "invalid"),
      })
    ),
  });

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  return (
    <FormProvider {...methods}>
      <form
        className="grid gap-4"
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
          label="Stock Symbol (Ticker)"
          placeholder="AAPL"
          classes={{ label: "font-semibold" }}
        />

        <Field<FV>
          required
          name="numShares"
          label="Number of Shares to donate"
          classes={{ label: "font-semibold" }}
        />
        <button
          disabled={methods.formState.isSubmitting}
          className="btn-orange btn-donate mt-2"
          type="submit"
        >
          Continue
        </button>
      </form>
    </FormProvider>
  );
}
