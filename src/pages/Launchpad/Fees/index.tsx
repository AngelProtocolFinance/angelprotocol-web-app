import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { TFee, TFees } from "slices/launchpad/types";
import { useLaunchpad } from "slices/launchpad";
import { positiveNumber, requiredPercent } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";
import { keys } from "./constants";

const fee: SchemaShape<TFee> = {
  receiver: string().when(keys.isActive, (v, schema) =>
    v ? requiredWalletAddr(chainIds.polygon) : schema.optional()
  ),
  rate: string().when(keys.isActive, (v, schema) =>
    v ? requiredPercent : schema.optional()
  ),
};

export default withStepGuard<6>(function Fees({ data }) {
  const { update } = useLaunchpad(6);
  const methods = useForm<FV>({
    mode: "onChange",
    resolver: yupResolver(
      object().shape<SchemaShape<TFees>>({
        deposit: object().shape(fee),
        withdrawal: object().shape(fee),
        earnings: object().shape(fee),
        referral_id: positiveNumber,
      })
    ),
    defaultValues: data || {
      deposit: { isActive: false, rate: "", receiver: "" },
      withdrawal: { isActive: false, rate: "", receiver: "" },
      earnings: { isActive: false, rate: "", receiver: "" },
    },
  });

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => update(data))} />
    </FormProvider>
  );
});
