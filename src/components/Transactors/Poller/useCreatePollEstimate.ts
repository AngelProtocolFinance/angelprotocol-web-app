import { StdFee } from "@cosmjs/stargate";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreatePollValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Gov from "contracts/Gov";
import extractFeeData from "helpers/extractFeeData";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { denoms } from "constants/currency";

export default function useCreatePollEstimate() {
  const {
    setError,
    getValues,
    formState: { isDirty, isValid },
  } = useFormContext<CreatePollValues>();
  const dispatch = useSetter();
  const [maxFee, setMaxFee] = useState<StdFee>();
  const { wallet } = useGetWallet();

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet not connected"));
          return;
        }

        if (!isDirty || !isValid) return;

        const amount = Number(getValues("amount"));
        //initial balance check to successfully run estimate

        const haloBalance = getTokenBalance(wallet.coins, denoms.halo);
        if (amount >= haloBalance) {
          setError("amount", { message: "not enough HALO balance" });
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Gov(wallet);
        const pollMsgs = contract.createPollMsgs(
          amount,
          //just set max contraints for estimates to avoid
          //estimating fee on different string lengths
          create_placeholder(64),
          create_placeholder(1024),
          create_placeholder(128)
        );

        //max fee estimate with extreme payload
        const fee = await contract.estimateFee([pollMsgs]);

        //2nd balance check including fees
        const feeData = extractFeeData(
          fee,
          wallet.chain.native_currency.token_id
        );
        dispatch(setFee(feeData.amount));

        if (feeData.amount >= wallet.chain.native_currency.balance) {
          setError("amount", { message: "Not enough balance to pay for fees" });
          return;
        }

        setMaxFee(fee);
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [wallet, isDirty, isValid]);

  return { maxFee, wallet };

  //return estimated fee computed using max constraints
}

function create_placeholder(num_bytes = 1) {
  return Array(num_bytes).fill("a").join("");
}
