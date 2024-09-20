import { yupResolver } from "@hookform/resolvers/yup";
import { centsDecimals, roundDown } from "helpers";
import { useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { requiredString } from "schemas/string";
import type { Currency } from "types/components";
import type { OnIncrement } from "../../common/Incrementers";
import { DEFAULT_PROGRAM, usdOption } from "../../common/constants";
import type { FormValues as FV, FormProps } from "./types";

export function useRhf(props: Omit<FormProps, "currencies">) {
  const initial: FV = {
    amount: "",
    currency: props.defaultCurr || usdOption,
    frequency: "subscription",
    program: DEFAULT_PROGRAM,
  };

  const currencyKey: keyof FV = "currency";
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FV>({
    defaultValues: props.details || initial,
    resolver: yupResolver(
      schema<FV>({
        frequency: requiredString,
        amount: stringNumber(
          (s) => s.required("Please enter an amount"),
          (n) =>
            n
              .positive("Amount must be greater than 0")
              .when(currencyKey, (values, schema) => {
                const [currency] = values as [Currency | undefined];
                return currency?.min
                  ? schema.min(currency.min, "less than min")
                  : schema;
              })
        ),
      })
    ),
  });

  const { field: frequency } = useController<FV, "frequency">({
    control: control,
    name: "frequency",
  });

  const { field: currency } = useController<FV, "currency">({
    control: control,
    name: "currency",
  });

  const { field: program } = useController<FV, "program">({
    control: control,
    name: "program",
  });

  const onIncrement: OnIncrement = (inc) => {
    const currency = getValues("currency");
    const amntNum = Number(getValues("amount"));
    if (Number.isNaN(amntNum)) return trigger("amount", { shouldFocus: true });
    setValue("amount", roundDown(amntNum + inc, centsDecimals(currency.rate)));
  };

  return {
    frequency,
    currency,
    program,
    onIncrement,
    register,
    handleSubmit,
    errors,
  };
}
