import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawResource, WithdrawValues } from "./types";
import { EndowmentWithdrawMeta, SourcePreview } from "pages/Admin/types";
import { TxOptions } from "slices/transaction/types";
import { AmountInfo } from "types/shared/withdraw";
import { vaultMap } from "services/juno/multicall/constants";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useDebouncer from "hooks/useDebouncer";
import processEstimateError from "helpers/processEstimateError";

interface Source {
  locked: string; //"0"
  liquid: string; //"0"
  vault: string; //"juno123addr.."
}

const SEPARATOR = ":";
export default function useWithrawEstimator(resources: WithdrawResource) {
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { isValid, isDirty },
  } = useFormContext<WithdrawValues>();

  const { wallet } = useGetWallet();
  const [tx, setTx] = useState<TxOptions>();
  const dispatch = useSetter();

  const anchor1_amount = watch("anchor1_amount") || "0";
  const anchor2_amount = watch("anchor2_amount") || "0";

  const concatenatedAmounts = [anchor1_amount, anchor2_amount].join(SEPARATOR);

  //use single debouncer so amounts are processed as batch
  const [debAmounts, isDebouncing] = useDebouncer<string>(
    concatenatedAmounts,
    500
  );

  const beneficiary = watch("beneficiary");

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        //any field input after this validation, can either be valid input or "0",
        //for n fields, only 1 is required to be valid, so others may be "0"
        if (!isDirty || !isValid) return;

        if (isDebouncing) {
          dispatch(setFormLoading(true));
          return;
        }

        const [debAnchor1Amount, debAnchor2Amount] =
          debAmounts.split(SEPARATOR);

        //NOTE: change this pre-construction on addition on future vaults
        const fieldInputs: AmountInfo[] = [
          {
            fieldId: "anchor1_amount",
            amount: new Decimal(debAnchor1Amount || "0"),
          },
          {
            fieldId: "anchor2_amount",
            amount: new Decimal(debAnchor2Amount || "0"),
          },
        ];

        //remove blank inputs casted to 0
        const filteredInputs = fieldInputs.filter((fieldInput) =>
          fieldInput.amount.gt(0)
        );
        //if all fields are blank, return
        if (filteredInputs.length <= 0) {
          dispatch(setFormError("No withdraw amount provided"));
          dispatch(setFee(0));
          setValue("total_ust", 0);
          setValue("total_receive", 0);
          return;
        }

        //construct exec payload along with proposal sources preview
        const sources: Source[] = [];
        const sourcesPreview: SourcePreview[] = [];
        const usdValues: Decimal[] = [];
        for (const fieldInput of filteredInputs) {
          const fieldId = fieldInput.fieldId;
          const { limit, addr, rate } = resources.vaultLimits[fieldId];
          if (fieldInput.amount.mul(1e6).gt(limit)) {
            setError(fieldId, { message: "not enough balance" });
          } else {
            clearErrors(fieldId);
            usdValues.push(fieldInput.amount);
            sources.push({
              vault: addr,
              locked: "0",
              liquid: fieldInput.amount
                .mul(1e6)
                .div(rate)
                .divToInt(1)
                .toString(),
            });

            sourcesPreview.push({
              vaultName: vaultMap[addr].name,
              usdAmount: fieldInput.amount.divToInt(1).toNumber(),
            });
          }
        }

        //no valid input was found
        if (sources.length <= 0) return;

        dispatch(setFormLoading(true));

        const accountContract = new Account(wallet, resources.accountAddr);
        const embeddedWithdrawMsg = accountContract.createEmbeddedWithdrawMsg({
          sources,
          beneficiary,
        });

        const usdTotal = usdValues
          .reduce((result, val) => result.add(val), new Decimal(0))
          .toNumber();

        //create proposal meta for tx preview
        const proposalMeta: EndowmentWithdrawMeta = {
          type: "acc_withdraw",
          data: { beneficiary, totalAmount: usdTotal, sourcesPreview },
        };

        const adminContract = new CW3(wallet, "");
        const proposalMsg = adminContract.createProposalMsg(
          "withdraw funds",
          "withdraw funds proposal",
          [embeddedWithdrawMsg],
          JSON.stringify(proposalMeta)
        );

        const { fee, feeAmount } = await adminContract.estimateFee([
          proposalMsg,
        ]);

        //get usd total of of sources

        if (feeAmount > usdTotal) {
          dispatch(setFormError("Withdraw amount is too low to pay for fees"));
          return;
        }

        const receiveAmount = usdTotal - feeAmount;

        setValue("total_ust", usdTotal);
        setValue("total_receive", receiveAmount);
        dispatch(setFee(feeAmount));
        setTx({ msgs: [proposalMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      }
    })();
    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [wallet, debAmounts, isDebouncing, isDirty, isValid, beneficiary]);

  return { tx, wallet };
}
