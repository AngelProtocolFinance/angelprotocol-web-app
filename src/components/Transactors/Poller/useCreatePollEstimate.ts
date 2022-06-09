import { max_desc_bytes, max_link_bytes, max_title_bytes } from "./schema";
import { CreatePollValues } from "./types";
import { Fee } from "@terra-money/terra.js";
import { CURRENCIES, denoms } from "constants/currency";
import Halo from "contracts/Halo";
import extractFeeData from "helpers/extractFeeData";
import processEstimateError from "helpers/processEstimateError";
import useWalletContext from "hooks/useWalletContext";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import getTokenBalance from "helpers/getTokenBalance";

export default function useCreatePollEstimate() {
  const {
    getValues,
    formState: { isDirty, isValid },
  } = useFormContext<CreatePollValues>();
  const { displayCoin: mainBalance, coins } = useGetter(
    (state) => state.wallet
  );
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
        const haloBalance = getTokenBalance(coins, denoms.uhalo);
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
          create_placeholder(max_title_bytes),
          create_placeholder(max_desc_bytes),
          create_placeholder(max_link_bytes)
        );

        //max fee estimate with extreme payload
        const fee = await contract.estimateFee(pollMsgs);
        const feeData = extractFeeData(fee);

        //2nd balance check including fees
        if (feeData.amount >= mainBalance.amount) {
          dispatch(
            setFormError(
              `Not enough ${CURRENCIES[feeData.denom].ticker} to pay fees`
            )
          );
          return;
        }

        dispatch(setFee(feeData.amount));
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
  }, [wallet, coins, mainBalance, isDirty, isValid]);

  return { wallet, maxFee };

  //return estimated fee computed using max constraints
}

function create_placeholder(num_bytes = 1) {
  return Array(num_bytes).fill("a").join("");
}
