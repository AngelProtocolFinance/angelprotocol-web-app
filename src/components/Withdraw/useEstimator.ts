import { useEffect, useState } from "react";
import { CreateTxOptions } from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";

import { useSetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";
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

        if (amount > Number(toCurrency(liquidCW20Tokens! / 1e6, 3))) {
          dispatch(setFormError("Not enough Token"));
          return;
        }

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

        if (amount === 0) {
          dispatch(setFee(0));
        } else {
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
