import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { Vote } from "types/server/contracts";
import { SigningCosmWasmClient, Tx } from "types/third-party/cosmjs";
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
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { getCosmosClient, getFee, getFeeNum } from "helpers/third-party/cosmjs";
import { denoms } from "constants/currency";

let client: SigningCosmWasmClient;
export default function useVoteEstimator() {
  const {
    watch,
    getValues,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<VoteValues>();
  const [tx, setTx] = useState<Tx>();
  const dispatch = useSetter();
  const { wallet } = useGetWallet();

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
        const staked_amount = new Decimal(govStaker.balance);
        const vote_amount = new Decimal(debounced_amount).mul(1e6);

        if (staked_amount.lt(vote_amount)) {
          setError("amount", { message: "not enough staked" });
          return;
        }

        dispatch(setFormLoading(true));
        if (!client) client = await getCosmosClient();
        const contract = new Gov(wallet.address);
        const voteMsg = contract.createVoteMsg(
          poll_id,
          debounced_vote,
          debounced_amount
        );

        const gas = await client.simulate(wallet.address, [voteMsg], undefined);
        const fee = getFee(gas);
        const feeNum = getFeeNum(fee);

        const ustBalance = getTokenBalance(wallet.coins, denoms.uusd);
        //2nd balance check including fees
        if (feeNum >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
          return;
        }

        dispatch(setFee(feeNum));
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
