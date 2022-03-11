import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import { useBalances } from "services/terra/queriers";
import { AdminVoteValues } from "./types";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import Admin from "contracts/Admin";
import useDebouncer from "hooks/useDebouncer";
import extractFeeNum from "helpers/extractFeeNum";

export default function useEstimator() {
  const { getValues, watch } = useFormContext<AdminVoteValues>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { main: UST_balance } = useBalances(denoms.uusd);
  const wallet = useConnectedWallet();
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
        const contract = new Admin(wallet);
        const voteMsg = contract.createVoteMsg(proposal_id, debounced_vote);
        const fee = await contract.estimateFee([voteMsg]);
        const feeNum = extractFeeNum(fee);

        //check if user has enough balance to pay for fees
        if (feeNum >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(feeNum));
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
  }, [debounced_vote, wallet, UST_balance]);

  return tx;
}
