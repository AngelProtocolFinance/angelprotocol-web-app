import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { TxOptions } from "slices/transaction/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useLazyBalanceQuery } from "services/apes";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import CW3 from "contracts/CW3";
import useDebouncer from "hooks/useDebouncer";
import { extractFeeAmount } from "helpers";

export default function useEstimator() {
  const { cw3, chain } = useAdminResources();
  const [queryBalance] = useLazyBalanceQuery();
  const { getValues, watch } = useFormContext<VoteValues>();
  const [tx, setTx] = useState<TxOptions>();
  const dispatch = useSetter();
  const vote = watch("vote");
  const [debounced_vote] = useDebouncer(vote, 300);

  useEffect(() => {
    (async () => {
      try {
        const proposalId = getValues("proposalId");

        dispatch(setFormLoading(true));
        const contract = new CW3(chain, cw3);
        const voteMsg = contract.createVoteMsg(proposalId, debounced_vote);
        const fee = await contract.estimateFee([voteMsg]);

        const feeAmount = extractFeeAmount(fee, chain.native_currency.token_id);
        dispatch(setFee(feeAmount));

        const { data: balance = 0 } = await queryBalance({
          token: chain.native_currency,
          chain,
        });
        //check if user has enough balance to pay for fees
        if (feeAmount >= balance) {
          dispatch(setFormError("Not enough balance to pay fees"));
          return;
        }

        setTx({ msgs: [voteMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("Error estimating transcation"));
      }
    })();
    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_vote]);

  return { tx, chain };
}
