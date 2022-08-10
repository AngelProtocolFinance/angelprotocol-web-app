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
import { getTokenBalance, processEstimateError } from "helpers";
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
        const { fee, feeAmount } = await contract.estimateFee([pollMsgs]);

        //2nd balance check including fees
        const ustBalance = getTokenBalance(wallet.coins, denoms.uusd);
        if (feeAmount >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
          return;
        }

        dispatch(setFee(feeAmount));
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
