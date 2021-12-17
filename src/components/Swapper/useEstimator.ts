import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import LBP from "contracts/LBP";
import { denoms } from "constants/currency";
import useDebouncer from "hooks/useDebouncer";
// import useTerraBalance from "hooks/useTerraBalance";
import {
  useBalances,
  useHaloBalance,
  usePairSimul,
  usePool,
} from "services/terra/hooks";
import { Values } from "./types";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import toCurrency from "helpers/toCurrency";
import useSpotPrice from "./useSpotPrice";
import getPercentPriceChange from "./getPercentPriceChange";

export default function useEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { main: UST_balance } = useBalances(denoms.uusd);
  const halo_balance = useHaloBalance();

  const pool = usePool();
  const pair_simul = usePairSimul();
  const spot_price = useSpotPrice(pair_simul, pool);

  const wallet = useConnectedWallet();
  const is_buy = watch("is_buy");
  const amount = Number(watch("amount")) || 0;
  const debounced_amount = useDebouncer(amount, 300);

  //TODO: check also if voter already voted
  useEffect(() => {
    (async () => {
      try {
        dispatch(setFormError(""));
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        //first balance check
        if (is_buy) {
          if (amount >= UST_balance) {
            dispatch(setFormError("Not enough UST"));
            return;
          }
        } else {
          if (amount >= halo_balance) {
            dispatch(setFormError("Not enough HALO"));
            return;
          }
        }

        dispatch(setFormLoading(true));

        const contract = new LBP(wallet);

        //on demand simul to get latest estimates
        const simul = await contract.pairSimul(debounced_amount, is_buy);

        //get commission and price impact
        const return_uamount = new Dec(simul.return_amount);
        const ucommission = new Dec(simul.commission_amount);
        const pct_commission = ucommission
          .div(return_uamount.add(ucommission))
          .mul(100)
          .toNumber();

        const pct_change = getPercentPriceChange(
          debounced_amount,
          simul,
          spot_price,
          is_buy
        );

        let tx: CreateTxOptions;
        if (is_buy) {
          tx = await contract.createBuyTx(debounced_amount);
        } else {
          tx = await contract.createSellTx(debounced_amount);
        }
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
        setValue("pct_change", toCurrency(pct_change, 2));
        setValue("pct_commission", toCurrency(pct_commission, 2));
        setValue(
          "return_amount",
          toCurrency(return_uamount.div(1e6).toNumber(), 3)
        );
        setTx(tx);
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("Error estimating transcation"));
      }
    })();
    //eslint-disable-next-line
  }, [debounced_amount, wallet, UST_balance, is_buy]);

  return tx;
}
