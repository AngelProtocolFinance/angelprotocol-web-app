import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { TFee, TFees } from "slices/launchpad/types";
import { Fee } from "types/ast";
import { FeeSetting } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { feeKeys } from "components/ast";
import { positiveNumber, requiredPercent } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { ADDRESS_ZERO } from "constants/evm";
import Form from "./Form";

const fee: SchemaShape<TFee> = {
  receiver: string().when(feeKeys.isActive, (v, schema) =>
    v ? requiredWalletAddr(chainIds.polygon) : schema.optional()
  ),
  rate: string().when(feeKeys.isActive, (v, schema) =>
    v ? requiredPercent : schema.optional()
  ),
};

export default function Fees() {
  const { withdrawFee, depositFee, earlyLockedWithdrawFee, balanceFee } =
    useAdminResources<"charity">();

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
    defaultValues: {
      earlyWithdraw: toFee(earlyLockedWithdrawFee),
      deposit: toFee(depositFee),
      withdrawal: toFee(withdrawFee),
      balance: toFee(balanceFee),
    },
  });

  const onSubmit: SubmitHandler<FV> = (data) => {};

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

function toFee({ bps, payoutAddress }: FeeSetting): Fee {
  return {
    rate: bps === "0" ? "" : (+bps / 100).toString(),
    receiver: payoutAddress === ADDRESS_ZERO ? "" : payoutAddress,
    isActive: !(bps === "0" && payoutAddress === ADDRESS_ZERO),
  };
}
