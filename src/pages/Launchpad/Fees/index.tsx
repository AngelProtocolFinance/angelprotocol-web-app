import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { TFee, TFees } from "slices/launchpad/types";
import { requiredPercent } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";
import { keys } from "./constants";

const fee: SchemaShape<TFee> = {
  receiver: string().when(keys.isActive, {
    is: true,
    then: () => requiredWalletAddr(),
    otherwise: (schema) => schema.optional(),
  }),
  rate: number().when(keys.isActive, {
    is: true,
    then: () => requiredPercent,
    otherwise: (schema) => schema.optional(),
  }),
};

export default withStepGuard<6>(function Fees({ data }) {
  const methods = useForm<FV>({
    resolver: yupResolver(
      object().shape<SchemaShape<TFees>>({
        deposit: object(fee),
        withdrawal: object(fee),
        earnings: object(fee),
      })
    ),
    defaultValues: data || {
      deposit: { isActive: false, rate: "", receiver: "" },
      withdrawal: { isActive: false, rate: "", receiver: "" },
      earnings: { isActive: false, rate: "", receiver: "" },
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
});
