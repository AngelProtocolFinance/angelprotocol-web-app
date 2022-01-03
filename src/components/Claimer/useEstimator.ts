import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import { useBalances, useGovStaker } from "services/terra/queriers";
import { Values } from "./types";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";

export default function useEstimator() {
  const { formState: isValid, setValue } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const gov_staker = useGovStaker();
  const wallet = useConnectedWallet();
  const { main: UST_balance } = useBalances(denoms.uusd);

  useEffect(() => {
    (async () => {
      try {
        if (!isValid) return;

        dispatch(setFormError(""));
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        if ((gov_staker?.claims || []).length <= 0) {
          dispatch(setFormError("No recent unstaked tokens"));
          return;
        }

        const hasClaim = !!gov_staker.claims?.find(
          (claim) => +claim.release_at.at_time <= Date.now() * 1e6
        );

        if (!hasClaim) {
          dispatch(setFormError("No claimable tokens at the moment"));
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Halo(wallet);
        const tx = await contract.createGovClaimTx();

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
        setTx(tx);
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("Error estimating transcation"));
      }
    })();

    return () => {
      dispatch(setFormError(""));
    };

    //eslint-disable-next-line
  }, [wallet, UST_balance, gov_staker]);

  return tx;
}
