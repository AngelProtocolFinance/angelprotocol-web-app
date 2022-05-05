import { Fee } from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import Halo from "contracts/Halo";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { CreatePollValues } from "./types";

export default function useCreatePollEstimate() {
  const {
    getValues,
    formState: { isDirty, isValid },
  } = useFormContext<CreatePollValues>();
  const { coins } = useGetter((state) => state.wallet);
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const [maxFee, setMaxFee] = useState<Fee>();

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Terra wallet is not connected"));
          return;
        }

        if (!isDirty || !isValid) return;

        const amount = Number(getValues("amount"));
        //initial balance check to successfully run estimate

        const haloBalance = getTokenBalance(coins, "halo");
        if (amount >= haloBalance) {
          dispatch(setFormError("Not enough halo balance"));
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Halo(wallet);
        const pollMsgs = await contract.createPollMsgs(
          amount,
          //just set max contraints for estimates to avoid
          //estimating fee on different string lengths
          create_placeholder(64),
          create_placeholder(1024),
          create_placeholder(128)
        );

        //max fee estimate with extreme payload
        const fee = await contract.estimateFee(pollMsgs);
        const feeNum = extractFeeNum(fee);

        //2nd balance check including fees
        const ustBalance = getTokenBalance(coins, "uusd");
        if (feeNum >= ustBalance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee({ fee: feeNum }));
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
  }, [wallet, coins, isDirty, isValid]);

  return { wallet, maxFee };

  //return estimated fee computed using max constraints
}

function create_placeholder(num_bytes = 1) {
  return Array(num_bytes).fill("a").join("");
}
