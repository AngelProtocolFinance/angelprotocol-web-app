import {
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import LP from "contracts/LP";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import toCurrency from "helpers/toCurrency";
import { denoms } from "constants/currency";
import { getSpotPrice } from "./getSpotPrice";
import { SwapValues } from "./types";

export default function useSwapEstimator() {
  const {
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useFormContext<SwapValues>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { coins } = useGetter((state) => state.wallet);

  const { wallet } = useWalletContext();

  const is_buy = watch("is_buy");
  const slippage = watch("slippage");
  const amount = Number(watch("amount")) || 0;
  const [debounced_amount] = useDebouncer(amount, 300);
  const [debounced_slippage] = useDebouncer<string>(slippage, 150);

  //TODO: check also if voter already voted
  useEffect(() => {
    (async () => {
      try {
        if (!isValid || !isDirty) return;
        dispatch(setFormError(null));
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!debounced_amount) {
          dispatch(setFee({ fee: 0 }));
          return;
        }

        const ustBalance = getTokenBalance(coins, "uusd");
        const haloBalance = getTokenBalance(coins, "halo");
        // first balance check
        if (is_buy) {
          if (amount > ustBalance) {
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

        let swapMsg: MsgExecuteContract;
        if (is_buy) {
          swapMsg = contract.createBuyMsg(
            debounced_amount,
            spot_price.toString(),
            debounced_slippage
          );
        } else {
          swapMsg = contract.createSellMsg(
            debounced_amount,
            //just reverse price for sell tx
            spot_price.toString(),
            debounced_slippage
          );
        }

        const fee = await contract.estimateFee([swapMsg]);
        const feeNum = fee.amount.get(denoms.uusd)!.mul(1e-6).amount.toNumber();

        //2nd balance check including fees
        if (is_buy && feeNum + debounced_amount >= ustBalance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }
        if (!is_buy && feeNum >= ustBalance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee({ fee: feeNum }));
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
  }, [
    debounced_amount,
    wallet,
    coins,
    is_buy,
    debounced_slippage,
    isValid,
    isDirty,
  ]);

  return { wallet, tx };
}
