import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { TxOptions } from "slices/transaction/types";
import { Vote } from "types/server/contracts";
import { useGovStaker } from "services/juno/gov/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
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
  const { wallet } = useGetWallet();
  const govStaker = useGovStaker();
  const amount = Number(watch("amount")) || 0;
  const vote = watch("vote");
  const [debounced_amount] = useDebouncer(amount, 300);
  const [debounced_vote] = useDebouncer<Vote>(vote, 300);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

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
        const contract = new Gov(wallet);
        const voteMsg = contract.createVoteMsg(
          poll_id,
          debounced_vote,
          debounced_amount
        );

        const fee = await contract.estimateFee([voteMsg]);

        const feeAmount = extractFeeAmount(
          fee,
          wallet.chain.native_currency.token_id
        );
        dispatch(setFee(feeAmount));

        //2nd balance check including fees
        if (feeAmount >= wallet.chain.native_currency.balance) {
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
  }, [debounced_amount, debounced_vote, wallet, govStaker, isValid, isDirty]);

  return { tx, wallet };
}
