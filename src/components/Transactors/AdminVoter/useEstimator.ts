import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AdminVoteValues } from "./types";
import { TxOptions } from "slices/transaction/types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Admin from "contracts/Admin";
import useDebouncer from "hooks/useDebouncer";
import extractFeeAmount from "helpers/extractFeeData";

export default function useEstimator() {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { wallet } = useGetWallet();
  const { getValues, watch } = useFormContext<AdminVoteValues>();
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

        const proposal_id = getValues("proposal_id");
        if (proposal_id === 0) {
          dispatch(setFormError("Error getting poll info"));
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Admin(wallet, cwContracts);
        const voteMsg = contract.createVoteMsg(proposal_id, debounced_vote);
        const fee = await contract.estimateFee([voteMsg]);

        const feeAmount = extractFeeAmount(
          fee,
          wallet.chain.native_currency.token_id
        );
        dispatch(setFee(feeAmount));

        //check if user has enough balance to pay for fees
        if (feeAmount >= wallet.chain.native_currency.balance) {
          dispatch(setFormError("Not enough balance to pay fees"));
          return;
        }

        setTx({ msgs: [voteMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError("Error estimating transcation"));
      }
    })();
    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, []);

  return { tx, wallet };
}
