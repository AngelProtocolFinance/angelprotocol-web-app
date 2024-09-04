import { yupResolver } from "@hookform/resolvers/yup";
import { useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { DEFAULT_PROGRAM, usdOption } from "../../common/constants";
import type { FormValues as FV, Props } from "./types";

export function useRhf(props: Props) {
  const initial: FV = {
    amount: "",
    currency: usdOption,
    program: DEFAULT_PROGRAM,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FV>({
    defaultValues: props.details || initial,
    resolver: yupResolver(
      schema<FV>({
        amount: stringNumber(
          (s) => s.required("Please enter an amount"),
          (n) => n.positive("Amount must be greater than 0")
        ),
      })
    ),
  });

  const { field: program } = useController<FV, "program">({
    control: control,
    name: "program",
  });

  return {
    handleSubmit,
    isSubmitting,
    register,
    //controllers
    program,
  };
}
