import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { HaloStakingValues, Props } from "@types-component/staker";
import { SchemaShape } from "@types-schema";
import { requiredTokenAmount } from "schemas/number";
import StakeForm from "./StakeForm";

const shape: SchemaShape<HaloStakingValues> = {
  amount: requiredTokenAmount,
};
const schema = Yup.object().shape(shape);

export default function Staker(props: Props) {
  const methods = useForm<HaloStakingValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      is_stake: !!props.isStake,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <StakeForm />
    </FormProvider>
  );
}
