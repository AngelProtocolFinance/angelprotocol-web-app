import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { TxOptions } from "slices/transaction/types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import CW3 from "contracts/CW3";
import useDebouncer from "hooks/useDebouncer";
import getTokenBalance from "helpers/getTokenBalance";
import { denoms } from "constants/currency";

export default function useEstimator() {
  const { wallet } = useGetWallet();
  const { getValues, watch } = useFormContext<VoteValues>();
  const [tx, setTx] = useState<TxOptions>();
  const dispatch = useSetter();
  const vote = watch("vote");
  const [debounced_vote] = useDebouncer(vote, 300);

  //TODO: check also if voter already voted
  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        const proposalId = getValues("proposalId");

        dispatch(setFormLoading(true));
        const contract = new CW3(wallet, "");
        const voteMsg = contract.createVoteMsg(proposalId, debounced_vote);
        const { fee, feeNum } = await contract.estimateFee([voteMsg]);

        const ustBalance = getTokenBalance(wallet.coins, denoms.uusd);
        //check if user has enough balance to pay for fees
        if (feeNum >= ustBalance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(feeNum));
        setTx({ msgs: [voteMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        console.log(err);
        dispatch(setFormError("Error estimating transcation"));
      }
    })();
    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_vote]);

  return { tx, wallet };
}
