import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { HaloStakingValues, Props } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredTokenAmount } from "schemas/number";
import StakeForm from "./Form";

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

//TODO: do balance check here on schema level
/**
 * if (!debounced_amount) {
      dispatch(setFee(0));
      return;
    }

    if (is_stake && condense(balance).lt(debounced_amount)) {
      //check $HALO balance
      setError("amount", {
        message: `not enough ${symbols.halo} balance`,
      });
      return;
    } else {
      if (condense(balance.sub(locked)).lt(debounced_amount)) {
        setError("amount", {
          message: "not enough unlocked staked balance",
        });
        return;
      }
    }
 */
