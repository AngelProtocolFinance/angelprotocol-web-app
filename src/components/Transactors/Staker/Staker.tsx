import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { requiredTokenAmount } from "schemas/number";
import { SchemaShape } from "schemas/types";
import StakeForm from "./StakeForm";
import { HaloStakingValues, Props } from "./types";

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
