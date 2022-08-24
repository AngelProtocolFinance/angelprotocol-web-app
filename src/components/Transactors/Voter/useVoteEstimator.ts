import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { TxOptions } from "slices/transaction/types";
import { Vote } from "types/server/contracts";
import { useLazyBalanceQuery } from "services/apes";
import { useGovStaker } from "services/juno/gov/queriers";
import { useChain } from "contexts/ChainGuard";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Gov from "contracts/Gov";
import useDebouncer from "hooks/useDebouncer";
import { extractFeeAmount, processEstimateError, scale } from "helpers";

export default function useVoteEstimator() {
  const {
    watch,
    getValues,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<VoteValues>();
  const [tx, setTx] = useState<TxOptions>();
  const dispatch = useSetter();
  const chain = useChain();
  const [queryBalance] = useLazyBalanceQuery();
  const govStaker = useGovStaker();
  const amount = Number(watch("amount")) || 0;
  const vote = watch("vote");
  const [debounced_amount] = useDebouncer(amount, 300);
  const [debounced_vote] = useDebouncer<Vote>(vote, 300);

  useEffect(() => {
    (async () => {
      try {
        if (!isValid || !isDirty) return;

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        const poll_id = +getValues("poll_id");
        if (poll_id === 0) {
          dispatch(setFormError("Error getting poll info"));
          return;
        }

        //check if voter already voted
        const is_voted =
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

        dispatch(setFormLoading(true));
        const contract = new Gov(chain);
        const voteMsg = contract.createVoteMsg(
          poll_id,
          debounced_vote,
          debounced_amount
        );

        const fee = await contract.estimateFee([voteMsg]);

        const feeAmount = extractFeeAmount(fee, chain.native_currency.token_id);
        dispatch(setFee(feeAmount));

        const { data: balance = 0 } = await queryBalance({
          token: chain.native_currency,
          chain,
        });

        //2nd balance check including fees
        if (feeAmount >= balance) {
          setError("amount", { message: "Not enough balance to pay for fees" });
          return;
        }

        setTx({ fee, msgs: [voteMsg] });
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, debounced_vote, chain, govStaker, isValid, isDirty]);

  return { tx, chain };
}
