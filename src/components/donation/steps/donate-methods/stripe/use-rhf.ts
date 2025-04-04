import { yupResolver } from "@hookform/resolvers/yup";
import { roundDown } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import type { Currency } from "types/components";
import { string } from "yup";
import { usdOption } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import type { FormValues as FV, Props } from "./types";

export function useRhf(props: Props) {
  const initial: FV = {
    amount: "",
    currency: usdOption,
    frequency: "" as FV["frequency"],
    program: { label: "", value: "" },
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
        frequency: string().required("Please select donation frequency"),
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
    const amntNum = Number(getValues("amount"));
    if (Number.isNaN(amntNum)) return trigger("amount", { shouldFocus: true });
    setValue("amount", roundDown(amntNum + inc, 0));
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
