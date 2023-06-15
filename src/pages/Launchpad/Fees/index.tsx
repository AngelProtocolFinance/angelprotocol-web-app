import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { TFee, TFees } from "slices/launchpad/types";
import { feeKeys } from "components/ast";
import { useLaunchpad } from "slices/launchpad";
import { positiveNumber, requiredPercent } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

const fee: SchemaShape<TFee> = {
  receiver: string().when(feeKeys.isActive, (v, schema) =>
    v ? requiredWalletAddr(chainIds.polygon) : schema.optional()
  ),
  rate: string().when(feeKeys.isActive, (v, schema) =>
    v ? requiredPercent : schema.optional()
  ),
};

export default withStepGuard<6>(function Fees({ data }) {
  const { update } = useLaunchpad(6);
  const methods = useForm<FV>({
    mode: "onChange",
    resolver: yupResolver(
      object().shape<SchemaShape<TFees>>({
        earlyWithdraw: object().shape(fee),
        deposit: object().shape(fee),
        withdrawal: object().shape(fee),
        balance: object().shape(fee),
        referral_id: positiveNumber,
      })
    ),
    defaultValues: data || {
      earlyWithdraw: { isActive: false, rate: "", receiver: "" },
      deposit: { isActive: false, rate: "", receiver: "" },
      withdrawal: { isActive: false, rate: "", receiver: "" },
      balance: { isActive: false, rate: "", receiver: "" },
    },
  });

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => update(data))} />
    </FormProvider>
  );
});
