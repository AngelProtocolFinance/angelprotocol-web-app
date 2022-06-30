import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { HaloStakingValues } from "./types";
import { TxOptions } from "types/third-party/cosmjs";
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
// import useTerraBalance from "hooks/useTerraBalance";
import { denoms } from "constants/currency";
import useStakerBalance from "./useStakerBalance";

export default function useEstimator() {
  const {
    watch,
    getValues,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<HaloStakingValues>();
  const [tx, setTx] = useState<TxOptions>();
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const is_stake = getValues("is_stake");
  const { balance, locked } = useStakerBalance(is_stake);
  const amount = Number(watch("amount")) || 0;
  const [debounced_amount] = useDebouncer(amount, 500);

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

        if (is_stake) {
          //check $HALO balance
          if (balance.div(1e6).lt(debounced_amount)) {
            setError("amount", { message: "not enough HALO balance" });
            return;
          }
        } else {
          if (balance.sub(locked).div(1e6).lt(debounced_amount)) {
            setError("amount", {
              message: "not enough staked halo less locked",
            });
            return;
          }
        }

        dispatch(setFormLoading(true));

        const contract = new Gov(wallet);

        const govMsg = is_stake
          ? contract.createGovStakeMsg(debounced_amount)
          : contract.createGovUnstakeMsg(debounced_amount);

        const { fee, feeNum } = await contract.estimateFee([govMsg]);

        //2nd balance check including fees
        const ustBalance = getTokenBalance(wallet.coins, denoms.uusd);
        if (feeNum >= ustBalance) {
          setError("amount", {
            message: "not enough UST to pay for fees",
          });
          return;
        }

        dispatch(setFee(feeNum));
        setTx({ msgs: [govMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError(processEstimateError(err)));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, wallet, balance, locked, isValid, isDirty]);

  return { tx, wallet };
}
