import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import LP from "contracts/LP";
import { denoms } from "constants/currency";
import useDebouncer from "hooks/useDebouncer";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { SwapValues } from "./types";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import toCurrency from "helpers/toCurrency";
import { getSpotPrice } from "./getSpotPrice";

export default function useSwapEstimator() {
  const {
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useFormContext<SwapValues>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { main: UST_balance } = useBalances(denoms.uusd);
  const { haloBalance } = useHaloBalance();

  const wallet = useConnectedWallet();

  const is_buy = watch("is_buy");
  const slippage = watch("slippage");
  const amount = Number(watch("amount")) || 0;
  const debounced_amount = useDebouncer(amount, 300);
  const debounced_slippage = useDebouncer<string>(slippage, 150);

  //TODO: check also if voter already voted
  useEffect(() => {
    (async () => {
      try {
        if (!isValid || !isDirty) return;
        dispatch(setFormError(""));
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        // first balance check
        if (is_buy) {
          if (amount > UST_balance) {
            dispatch(setFormError("Not enough UST"));
            return;
          }
        } else {
          if (amount > haloBalance) {
            dispatch(setFormError("Not enough HALO"));
            return;
          }
        }

        dispatch(setFormLoading(true));

        const contract = new LP(wallet);

        //invasive simul
        const simul = await contract.pairSimul(debounced_amount, is_buy);
        const spot_price = getSpotPrice(simul, debounced_amount);

        //get commission and price impact
        const return_uamount = new Dec(simul.return_amount);
        const ucommission = new Dec(simul.commission_amount);
        const pct_commission = ucommission
          .div(return_uamount.add(ucommission))
          .mul(100)
          .toNumber();

        let tx: CreateTxOptions;
        if (is_buy) {
          tx = await contract.createBuyTx(
            debounced_amount,
            spot_price.toString(),
            debounced_slippage
          );
        } else {
          tx = await contract.createSellTx(
            debounced_amount,
            //just reverse price for sell tx
            spot_price.toString(),
            debounced_slippage
          );
        }
        const estimatedFee = tx
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        //2nd balance check including fees
        if (is_buy && estimatedFee + debounced_amount >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }
        if (!is_buy && estimatedFee >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(estimatedFee));
        setValue("pct_commission", toCurrency(pct_commission, 2));
        setValue(
          "return_amount",
          toCurrency(return_uamount.div(1e6).toNumber(), 3)
        );
        setValue("ratio", spot_price.toNumber());
        setTx(tx);
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError("transaction simulation failed"));
      }
    })();
    return () => {
      dispatch(setFormError(""));
    };
    //eslint-disable-next-line
  }, [debounced_amount, wallet, UST_balance, is_buy, debounced_slippage]);

  return { wallet, tx };
}
