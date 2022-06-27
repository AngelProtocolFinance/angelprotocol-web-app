import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AdminVoteValues } from "./types";
import { SigningCosmWasmClient, Tx } from "types/third-party/cosmjs";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Admin from "contracts/Admin";
import useDebouncer from "hooks/useDebouncer";
import getTokenBalance from "helpers/getTokenBalance";
import { getCosmosClient, getFee, getFeeNum } from "helpers/third-party/cosmjs";
import { denoms } from "constants/currency";

let client: SigningCosmWasmClient;
export default function useEstimator() {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { wallet } = useGetWallet();
  const { getValues, watch } = useFormContext<AdminVoteValues>();
  const [tx, setTx] = useState<Tx>();
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
        if (!client) client = await getCosmosClient();
        const contract = new Admin(cwContracts, wallet.address);
        const voteMsg = contract.createVoteMsg(proposal_id, debounced_vote);
        const gasLimit = await client.simulate(
          wallet.address,
          [voteMsg],
          undefined
        );
        const fee = getFee(gasLimit);
        const feeNum = getFeeNum(fee);
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
