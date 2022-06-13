import { CreateTxOptions, Dec } from "@terra-money/terra.js";
<<<<<<< HEAD
=======
import { CURRENCIES } from "constants/currency";
import Halo from "contracts/Halo";
import { Vote } from "contracts/types";
import extractFeeData from "helpers/extractFeeData";
import processEstimateError from "helpers/processEstimateError";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
>>>>>>> master
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useGovStaker } from "services/terra/gov/queriers";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
<<<<<<< HEAD
import Gov from "contracts/Gov";
import { Vote } from "contracts/types";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { denoms } from "constants/currency";
=======
>>>>>>> master
import { VoteValues } from "./types";

export default function useVoteEstimator() {
  const {
    watch,
    getValues,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<VoteValues>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const { coins } = useGetter((state) => state.wallet);
  const dispatch = useSetter();
<<<<<<< HEAD
=======
  const { displayCoin: mainBalance, coins } = useGetter(
    (state) => state.wallet
  );
>>>>>>> master
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
          dispatch(setFee({ fee: 0 }));
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

        const staked_amount = new Dec(govStaker.balance);
        const vote_amount = new Dec(debounced_amount).mul(1e6);

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
        const feeData = extractFeeData(fee);

        const ustBalance = getTokenBalance(coins, denoms.uusd);
        //2nd balance check including fees
<<<<<<< HEAD
        if (feeNum >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
          return;
        }

        dispatch(setFee({ fee: feeNum }));
=======
        if (feeData.amount >= mainBalance.amount) {
          dispatch(
            setFormError(
              `Not enough ${CURRENCIES[feeData.denom].ticker} to pay fees`
            )
          );
          return;
        }

        dispatch(setFee(feeData.amount));
>>>>>>> master
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
<<<<<<< HEAD
  }, [
    debounced_amount,
    debounced_vote,
    wallet,
    coins,
    govStaker,
    isValid,
    isDirty,
  ]);
=======
  }, [debounced_amount, debounced_vote, wallet, mainBalance, govStaker, coins]);
>>>>>>> master

  return { tx, wallet };
}
