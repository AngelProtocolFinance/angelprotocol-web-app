import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { TxOptions } from "slices/transaction/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import CW3 from "contracts/CW3";
import useDebouncer from "hooks/useDebouncer";

export default function useEstimator() {
  const { wallet } = useGetWallet();
  const { cw3 } = useAdminResources();
  const { getValues, watch } = useFormContext<VoteValues>();
  const [tx, setTx] = useState<TxOptions>();
  const dispatch = useSetter();
  const vote = watch("vote");
  const [debounced_vote] = useDebouncer(vote, 300);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        const proposalId = getValues("proposalId");

        dispatch(setFormLoading(true));
        const contract = new CW3(wallet, cw3);
        const voteMsg = contract.createVoteMsg(proposalId, debounced_vote);
        const { fee, feeAmount } = await contract.estimateFee([voteMsg]);

        //check if user has enough balance to pay for fees
        if (feeAmount >= wallet.displayCoin.balance) {
          dispatch(setFormError("Not balance to pay fees"));
          return;
        }

        dispatch(setFee(feeAmount));
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
