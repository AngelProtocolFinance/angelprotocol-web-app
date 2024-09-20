import { yupResolver } from "@hookform/resolvers/yup";
import { useController, useForm } from "react-hook-form";
import { schema as schemaFn, stringNumber } from "schemas/shape";
import type { TokenV2 } from "types/components";
import { ValidationError, number, string } from "yup";
import { DEFAULT_PROGRAM, initTokenOption } from "../../common/constants";
import type { CryptoFormStep } from "../../types";
import type { DonateValues as DV } from "./types";

const initial: DV = {
  program: DEFAULT_PROGRAM,
  token: initTokenOption,
  amount: "",
  rate: 0,
  min: 0,
};

export const multipliableAmount = (amnt: string) =>
  number().min(0).isValidSync(amnt) ? +amnt : 0;

type Props = CryptoFormStep;
export function useRhf(props: Props) {
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<DV>({
    defaultValues: props.details || initial,
    resolver: yupResolver(
      schemaFn<DV>({
        token: schemaFn<DV["token"]>({
          id: string().required("required"),
        }),
        amount: stringNumber(
          (s) => s.required("required"),
          (n) =>
            n
              .positive("must be greater than 0")
              .when(["min", "token"], (values, schema) => {
                console.log(values, schema);
                const [min, token] = values as [number, TokenV2];
                return schema.min(min || 0, "less than minimum").test((val) => {
                  const numDecimals =
                    val?.toString().split(".").at(1)?.length ?? 0;
                  const precision = token.precision;
                  if (numDecimals <= precision) return true;
                  if (!token) return true;
                  return new ValidationError(
                    `can't be more than ${precision} decimals`,
                    precision,
                    "amount"
                  );
                });
              })
        ),
        //no need to validate split, restricted by slider
      })
    ),
  });

  const { field: program } = useController<DV, "program">({
    control: control,
    name: "program",
  });

  const { field: token } = useController<DV, "token">({
    control: control,
    name: "token",
  });

  return {
    program,
    reset,
    setValue,
    handleSubmit,
    token,
    register,
    errors,
    watch,
  };
}
