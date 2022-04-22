import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Source } from "types/contracts/accounts";
import { proposalTypes } from "types/routes";
import { ProposalMeta, SourcePreview } from "pages/Admin/types";
import { vaultMap } from "services/terra/multicall/constants";
import { AmountInfo, VaultFieldIds } from "services/terra/multicall/types";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import Account from "contracts/Account";
import Admin from "contracts/Admin";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import processEstimateError from "helpers/processEstimateError";
import { WithdrawResource, WithdrawValues } from "./types";

const SEPARATOR = ":";
export default function useWithrawEstimator(resources: WithdrawResource) {
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { isValid, isDirty },
  } = useFormContext<WithdrawValues>();

  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { wallet } = useWalletContext();

  const anchor1_amount = watch(VaultFieldIds.anchor1_amount) || "0";
  const anchor2_amount = watch(VaultFieldIds.anchor2_amount) || "0";

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
            fieldId: VaultFieldIds.anchor1_amount,
            amount: new Dec(debAnchor1Amount || "0"),
          },
          {
            fieldId: VaultFieldIds.anchor2_amount,
            amount: new Dec(debAnchor2Amount || "0"),
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
        const usdValues: Dec[] = [];
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
              liquid: fieldInput.amount.mul(1e6).div(rate).toInt().toString(),
            });

            sourcesPreview.push({
              vaultName: vaultMap[addr].name,
              usdAmount: fieldInput.amount.toInt().toNumber(),
            });
          }
        }

        //no valid input was found
        if (sources.length <= 0) return;

        dispatch(setFormLoading(true));

        const accountContract = new Account(resources.accountAddr, wallet);
        const embeddedWithdrawMsg = accountContract.createEmbeddedWithdrawMsg({
          sources,
          beneficiary,
        });

        const usdTotal = usdValues
          .reduce((result, val) => result.add(val), new Dec(0))
          .toNumber();

        //create proposal meta for tx preview
        const proposalMeta: ProposalMeta = {
          type: proposalTypes.endowment_withdraw,
          data: { beneficiary, totalAmount: usdTotal, sourcesPreview },
        };

        const adminContract = new Admin(cwContracts, wallet);
        const proposalMsg = adminContract.createProposalMsg(
          "withdraw funds",
          "withdraw funds proposal",
          [embeddedWithdrawMsg],
          JSON.stringify(proposalMeta)
        );

        const fee = await adminContract.estimateFee([proposalMsg]);
        const feeNum = extractFeeNum(fee);

        //get usd total of of sources

        if (feeNum > usdTotal) {
          dispatch(setFormError("Withdraw amount is too low to pay for fees"));
          return;
        }

        const receiveAmount = usdTotal - feeNum;

        setValue("total_ust", usdTotal);
        setValue("total_receive", receiveAmount);
        dispatch(setFee(feeNum));
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
  }, [
    wallet,
    debAmounts,
    isDebouncing,
    isDirty,
    isValid,
    beneficiary,
    cwContracts,
  ]);

  return { tx, wallet };
}
