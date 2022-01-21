import { useEffect, useState, useMemo } from "react";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";

import { useSetter } from "store/accessors";
import { Values, VaultFields } from "./types";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useEndowmentHoldingsState } from "services/terra/states";
import { useExchangeRate } from "services/terra/vaults/queriers";
import Account from "contracts/Account";
import { denoms } from "constants/currency";
import { useSetModal } from "components/Nodal/Nodal";
import useDebouncer from "hooks/useDebouncer";
import { AmountInfo, filter_infos } from "./helpers";
import { vault_addr_map, vault_field_map } from "constants/contracts";
import { Source } from "contracts/types";

export default function useEstimator() {
  const { hideModal } = useSetModal();
  const { watch, setValue, getValues, setError, clearErrors } =
    useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();

  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  //query fresh exchange rate upon opening form

  const anchor1_amount = watch("anchor1_amount");
  const anchor2_amount = watch("anchor2_amount");
  const account_addr = getValues("account_addr");

  const rates = useExchangeRate();
  const holdings = useEndowmentHoldingsState(account_addr);

  const deb_anchor1_amount = useDebouncer<string>(anchor1_amount, 300);
  const deb_anchor2_amount = useDebouncer<string>(anchor2_amount, 300);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setFormError(""));
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          hideModal();
          return;
        }
        const amountInfos: AmountInfo[] = [
          { field_id: VaultFields.anchor1_amount, amount: deb_anchor1_amount },
          { field_id: VaultFields.anchor2_amount, amount: deb_anchor2_amount },
        ];
        const filtered_infos = filter_infos(amountInfos);

        //if all fields are zero or undefined
        if (filtered_infos.length <= 0) {
          dispatch(setFee(0));
          setValue("total_ust", 0);
          setValue("total_receive", 0);
          return;
        }

        //check withraw amount per vault and construct withdraw arg
        const sources: Source[] = [];
        const liq_holdings = holdings.liquid_cw20;
        for (const holding of liq_holdings) {
          const field = vault_field_map[holding.address] as VaultFields;
          //a holding may be present but user may opt not to withdraw
          const to_withdraw = getValues(field) || "0";
          if (new Dec(to_withdraw).mul(1e6).gt(new Dec(holding.amount))) {
            setError(field, { message: "not enough token" });
          } else {
            clearErrors(field);
            if (to_withdraw !== "0") {
              sources.push({
                vault: holding.address,
                locked: "0",
                liquid: to_withdraw,
              });
            }
          }
        }

        if (sources.length <= 0) {
          return;
        }

        dispatch(setFormLoading(true));

        const account = new Account(account_addr, wallet);
        const transaction = await account.createWithdrawTx(sources);

        const estimatedFee = transaction
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        console.log(estimatedFee, sources);
        dispatch(setFormLoading(false));
        return;

        const ust_amount = new Dec(10)
          .mul(new Dec(rates[account_addr] || "0"))
          .div(1e6)
          .toNumber();

        if (estimatedFee > ust_amount) {
          dispatch(setFormError("Withdraw amount is too low to pay for fees"));
          return;
        }

        const receive_amount = ust_amount - estimatedFee;

        setValue("total_ust", ust_amount);
        setValue("total_receive", receive_amount);
        dispatch(setFee(estimatedFee));
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
  }, [wallet, deb_anchor1_amount, deb_anchor2_amount, rates, holdings]);

  return tx;
}
