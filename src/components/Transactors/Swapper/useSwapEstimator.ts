import {
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import LP from "contracts/LP";
import useDebouncer from "hooks/useDebouncer";
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
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { providerId, coins, walletAddr } = useGetWallet();
  const is_buy = watch("is_buy");
  const slippage = watch("slippage");
  const amount = Number(watch("amount")) || 0;
  const [debounced_amount] = useDebouncer(amount, 300);
  const [debounced_slippage] = useDebouncer<string>(slippage, 150);

  //TODO: check also if voter already voted
  useEffect(() => {
    (async () => {
      try {
        if (!providerId) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isValid || !isDirty) return;
        dispatch(setFormError(null));

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        const ustBalance = getTokenBalance(coins, denoms.uusd);
        const haloBalance = getTokenBalance(coins, denoms.halo);
        // first balance check
        if (is_buy) {
          if (amount > ustBalance) {
            setError("amount", { message: "not enough UST" });
            return;
          }
        } else {
          if (amount > haloBalance) {
            setError("amount", { message: "not enough HALO" });
            return;
          }
        }

        dispatch(setFormLoading(true));

        const contract = new LP(walletAddr);

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
        const feeNum = fee.amount.get("uusd")!.mul(1e-6).amount.toNumber();

        //2nd balance check including fees
        if (is_buy && feeNum + debounced_amount >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
          return;
        }
        if (!is_buy && feeNum >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
          return;
        }

        dispatch(setFee(feeNum));
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
  }, [debounced_amount, coins, is_buy, debounced_slippage, isValid, isDirty]);

  return { tx };
}
