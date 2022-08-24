import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { Props, VoteValues } from "./types";
import { requiredTokenAmount } from "schemas/number";
import VoterForm from "./Form";

const schema = Yup.object().shape({
  amount: requiredTokenAmount,
});

export default function Voter(props: Props) {
  const methods = useForm<VoteValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      vote: "yes",
      poll_id: `${props.poll_id}`,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <VoterForm />
    </FormProvider>
  );
}

/**
 * TODO: handle this checks on schema level
 *  const is_voted =
          govStaker.locked_balance.find(
            ([_poll_id]) => _poll_id === poll_id
          ) !== undefined;

        if (is_voted) {
          dispatch(setFormError("You already voted"));
          return;
        }

        //check if voter has enough staked and not yet used to vote for other polls
        const staked_amount = new Decimal(govStaker.balance);
        const vote_amount = scale(debounced_amount);

        if (staked_amount.lt(vote_amount)) {
          setError("amount", { message: "not enough staked" });
          return;
        }
 *
 *
 */
