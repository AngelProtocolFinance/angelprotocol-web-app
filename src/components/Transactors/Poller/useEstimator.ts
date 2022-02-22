import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import { CreatePollValues } from "./types";
import { useSetter } from "store/accessors";
import {
  setFormError,
  setFormLoading,
  setFee,
} from "services/transaction/transactionSlice";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { max_title_bytes, max_link_bytes, max_desc_bytes } from "./schema";

export default function useEstimator() {
  const { getValues } = useFormContext<CreatePollValues>();
  const { main: UST_balance } = useBalances(denoms.uusd);
  const dispatch = useSetter();
  const { haloBalance } = useHaloBalance();
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      try {
        dispatch(setFormError(""));

        if (!wallet) {
          dispatch(setFormError("Terra wallet is not connected"));
          return;
        }

        const amount = Number(getValues("amount"));
        //initial balance check to successfully run estimate
        if (amount >= haloBalance) {
          dispatch(setFormError("Not enough halo balance"));
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Halo(wallet);
        const tx = await contract.createPoll(
          amount,
          //just set max contraints for estimates to avoid
          //estimating fee on different string lengths
          create_placeholder(max_title_bytes),
          create_placeholder(max_desc_bytes),
          create_placeholder(max_link_bytes)
        );

        //fee estimate with max contraints
        const estimatedFee = tx
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        //2nd balance check including fees
        if (estimatedFee >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(estimatedFee));
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError("Error estimating transaction"));
      }
    })();

    return () => {
      dispatch(setFormError(""));
    };
    //eslint-disable-next-line
  }, [wallet, haloBalance, UST_balance]);

  return { wallet };

  //return estimated fee computed using max constraints
}

function create_placeholder(num_bytes = 1) {
  return Array(num_bytes).fill("a").join("");
}
