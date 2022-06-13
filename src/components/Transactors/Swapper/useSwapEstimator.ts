import {
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
} from "@terra-money/terra.js";
<<<<<<< HEAD
=======
import { CURRENCIES, denoms } from "constants/currency";
import LP from "contracts/LP";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import toCurrency from "helpers/toCurrency";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
>>>>>>> master
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
<<<<<<< HEAD
import LP from "contracts/LP";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import toCurrency from "helpers/toCurrency";
import { denoms } from "constants/currency";
=======
>>>>>>> master
import { getSpotPrice } from "./getSpotPrice";
import { SwapValues } from "./types";

export default function useSwapEstimator() {
  const {
    watch,
    setValue,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<SwapValues>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
<<<<<<< HEAD
  const { coins } = useGetter((state) => state.wallet);
=======
  const { displayCoin: mainBalance, coins } = useGetter(
    (state) => state.wallet
  );
>>>>>>> master

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
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isValid || !isDirty) return;
        dispatch(setFormError(null));

        if (!debounced_amount) {
          dispatch(setFee({ fee: 0 }));
          return;
        }

        const ustBalance = getTokenBalance(coins, denoms.uusd);
        const haloBalance = getTokenBalance(coins, denoms.halo);
        // first balance check
        if (is_buy) {
<<<<<<< HEAD
          if (amount > ustBalance) {
            setError("amount", { message: "not enough UST" });
=======
          if (amount > mainBalance.amount) {
            dispatch(
              setFormError(`Not enough ${CURRENCIES[mainBalance.denom].ticker}`)
            );
>>>>>>> master
            return;
          }
        } else {
          const haloBalance = getTokenBalance(coins, denoms.uhalo);
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
        const feeNum = fee.amount
          .get(mainBalance.denom)!
          .mul(1e-6)
          .amount.toNumber();

        //2nd balance check including fees
<<<<<<< HEAD
        if (is_buy && feeNum + debounced_amount >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
          return;
        }
        if (!is_buy && feeNum >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
=======
        if (is_buy && feeNum + debounced_amount >= mainBalance.amount) {
          dispatch(
            setFormError(
              `Not enough ${CURRENCIES[mainBalance.denom].ticker} to pay fees`
            )
          );
          return;
        }
        if (!is_buy && feeNum >= mainBalance.amount) {
          dispatch(
            setFormError(
              `Not enough ${CURRENCIES[mainBalance.denom].ticker} to pay fees`
            )
          );
>>>>>>> master
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
<<<<<<< HEAD
    coins,
    is_buy,
    debounced_slippage,
    isValid,
    isDirty,
=======
    mainBalance,
    coins,
    is_buy,
    debounced_slippage,
>>>>>>> master
  ]);

  return { wallet, tx };
}
