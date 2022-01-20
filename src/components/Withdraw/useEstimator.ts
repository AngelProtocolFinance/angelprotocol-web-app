import { useEffect, useState } from "react";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";

import { useSetter } from "store/accessors";
import { Values } from "./types";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import Account from "contracts/Account";
import { denoms } from "constants/currency";
import { useSetModal } from "components/Nodal/Nodal";

export default function useEstimator(
  liquidCW20Tokens: number | undefined,
  liquidCW20TokenValue: number | undefined,
  anchorVault: string
) {
  const { hideModal } = useSetModal();
  const { watch, setValue, formState: isValid } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();

  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const address = watch("receiver") || "";
  const amount = Number(watch("withdraw")) || 0;
  const withdrawAmount = (liquidCW20TokenValue! * Number(amount)) / 100;
  const withdrawTokenQty = Math.round(
    (liquidCW20TokenValue! * Number(amount)) / 100 || 0
  ).toString();

  useEffect(() => {
    (async () => {
      try {
        if (!isValid) return;
        dispatch(setFormError(""));

        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          hideModal();
          return;
        }

        const balance = new Dec(liquidCW20Tokens).div(1e6);
        if (balance.lt(amount)) {
          dispatch(setFormError("Not enough Token"));
          return;
        }

        if (amount === 0) {
          dispatch(setFee(0));
          setValue("total", 0);
        } else {
          setValue("total", 0);
          dispatch(setFormLoading(true));

          const account = new Account(address, wallet);
          const transaction = await account.createWithdrawTx(
            anchorVault,
            withdrawTokenQty
          );

          // Computing for fees
          const estimatedFee =
            transaction.fee!.amount.get(denoms.uusd)!.amount.toNumber() / 1e6;
          setValue("withdrawAmount", withdrawAmount);
          setValue("total", withdrawAmount - estimatedFee);

          // Withdraw amount should be at least $2
          const withdraw_amount = new Dec(withdrawAmount - estimatedFee);
          if (withdraw_amount.lte(2)) {
            dispatch(
              setFormError(
                "Withdraw amount is too low. You can withdraw more than $2"
              )
            );
            return;
          }
          dispatch(setFee(estimatedFee));
        }

        setTx(tx);
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("transaction simulation failed"));
      }
    })();
    return () => {
      dispatch(setFormError(""));
    };
  }, [amount, wallet]);

  return tx;
}
