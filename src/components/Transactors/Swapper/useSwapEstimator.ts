import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { TxOptions } from "slices/transaction/types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import LP from "contracts/LP";
import useDebouncer from "hooks/useDebouncer";
import extractFeeData from "helpers/extractFeeData";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import toCurrency from "helpers/toCurrency";
import { denoms } from "constants/currency";
import { getSpotPrice } from "./getSpotPrice";

export default function useSwapEstimator() {
  const {
    watch,
    setValue,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<SwapValues>();
  const [tx, setTx] = useState<TxOptions>();
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const is_buy = watch("is_buy");
  const slippage = watch("slippage");
  const amount = Number(watch("amount")) || 0;
  const [debounced_amount] = useDebouncer(amount, 300);
  const [debounced_slippage] = useDebouncer<string>(slippage, 150);

  //TODO: check also if voter already voted
  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isValid || !isDirty) return;
        dispatch(setFormError(null));

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        const junoBalance = getTokenBalance(
          wallet.coins,
          wallet.chain.native_currency.token_id
        );
        const haloBalance = getTokenBalance(wallet.coins, denoms.halo);
        // first balance check
        if (is_buy) {
          if (amount > junoBalance) {
            setError("amount", { message: "not enough JUNO" });
            return;
          }
        } else {
          if (amount > haloBalance) {
            setError("amount", { message: "not enough HALO" });
            return;
          }
        }

        dispatch(setFormLoading(true));

        const contract = new LP(wallet);

        //invasive simul
        const simul = await contract.pairSimul(debounced_amount, is_buy);
        const spot_price = getSpotPrice(simul, debounced_amount);

        //get commission and price impact
        const return_uamount = new Decimal(simul.return_amount);
        const ucommission = new Decimal(simul.commission_amount);
        const pct_commission = ucommission
          .div(return_uamount.add(ucommission))
          .mul(100)
          .toNumber();

        const swapMsg = is_buy
          ? contract.createBuyMsg(
              debounced_amount,
              spot_price.toString(),
              debounced_slippage
            )
          : contract.createSellMsg(
              debounced_amount,
              //just reverse price for sell tx
              spot_price.toString(),
              debounced_slippage
            );

        const fee = await contract.estimateFee([swapMsg]);

        //2nd balance check including fees
        const feeData = extractFeeData(
          fee,
          wallet.chain.native_currency.token_id
        );
        dispatch(setFee(feeData.amount));

        if (is_buy && feeData.amount + debounced_amount >= junoBalance) {
          setError("amount", { message: "not enough JUNO to pay for fees" });
          return;
        }
        if (!is_buy && feeData.amount >= junoBalance) {
          setError("amount", { message: "not enough JUNO to pay for fees" });
          return;
        }

        setValue("pct_commission", toCurrency(pct_commission, 2));
        setValue(
          "return_amount",
          toCurrency(return_uamount.div(1e6).toNumber(), 3)
        );
        setValue("ratio", spot_price.toNumber());
        setTx({ msgs: [swapMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      }
    })();
    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, wallet, is_buy, debounced_slippage, isValid, isDirty]);

  return { tx, wallet };
}
