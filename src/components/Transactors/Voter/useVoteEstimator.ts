import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import { currency_text, MAIN_DENOM } from "constants/currency";
import Halo from "contracts/Halo";
import { Vote } from "contracts/types";
import extractFeeData from "helpers/extractFeeData";
import processEstimateError from "helpers/processEstimateError";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useGovStaker } from "services/terra/gov/queriers";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useSetter } from "store/accessors";
import { VoteValues } from "./types";

export default function useVoteEstimator() {
  const {
    watch,
    getValues,
    formState: { isValid, isDirty },
  } = useFormContext<VoteValues>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { main: mainBalance } = useBalances(MAIN_DENOM);
  const { haloBalance } = useHaloBalance();
  const { wallet } = useWalletContext();
  const govStaker = useGovStaker();
  const amount = Number(watch("amount")) || 0;
  const vote = watch("vote");
  const [debounced_amount] = useDebouncer(amount, 300);
  const [debounced_vote] = useDebouncer<Vote>(vote, 300);

  //TODO: check also if voter already voted
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
        const staked_amount = new Dec(govStaker.balance);
        const vote_amount = new Dec(debounced_amount).mul(1e6);

        if (staked_amount.lt(vote_amount)) {
          dispatch(setFormError(`Not enough staked`));
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Halo(wallet);
        const voteMsg = contract.createVoteMsg(
          poll_id,
          debounced_vote,
          debounced_amount
        );

        const fee = await contract.estimateFee([voteMsg]);
        const { feeAmount, feeDenom } = extractFeeData(fee);

        //2nd balance check including fees
        if (feeAmount >= mainBalance.amount) {
          dispatch(
            setFormError(`Not enough ${currency_text[feeDenom]} to pay fees`)
          );
          return;
        }

        dispatch(setFee(feeAmount));
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
  }, [
    debounced_amount,
    debounced_vote,
    wallet,
    mainBalance,
    haloBalance,
    govStaker,
  ]);

  return { tx, wallet };
}
