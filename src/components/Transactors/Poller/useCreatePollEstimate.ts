import { max_desc_bytes, max_link_bytes, max_title_bytes } from "./schema";
import { CreatePollValues } from "./types";
import { Fee } from "@terra-money/terra.js";
<<<<<<< HEAD
=======
import { CURRENCIES, denoms } from "constants/currency";
import Halo from "contracts/Halo";
import extractFeeData from "helpers/extractFeeData";
import processEstimateError from "helpers/processEstimateError";
import useWalletContext from "hooks/useWalletContext";
>>>>>>> master
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
<<<<<<< HEAD
import Gov from "contracts/Gov";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { denoms } from "constants/currency";
import { CreatePollValues } from "./types";
=======
import getTokenBalance from "helpers/getTokenBalance";
>>>>>>> master

export default function useCreatePollEstimate() {
  const {
    setError,
    getValues,
    formState: { isDirty, isValid },
  } = useFormContext<CreatePollValues>();
<<<<<<< HEAD
  const { coins } = useGetter((state) => state.wallet);
=======
  const { displayCoin: mainBalance, coins } = useGetter(
    (state) => state.wallet
  );
>>>>>>> master
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
<<<<<<< HEAD

        const haloBalance = getTokenBalance(coins, denoms.halo);
=======
        const haloBalance = getTokenBalance(coins, denoms.uhalo);
>>>>>>> master
        if (amount >= haloBalance) {
          setError("amount", { message: "not enough HALO balance" });
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Gov(wallet);
        const pollMsgs = await contract.createPollMsgs(
          amount,
          //just set max contraints for estimates to avoid
          //estimating fee on different string lengths
          create_placeholder(64),
          create_placeholder(1024),
          create_placeholder(128)
        );

        //max fee estimate with extreme payload
<<<<<<< HEAD
        const fee = await contract.estimateFee([pollMsgs]);
        const feeNum = extractFeeNum(fee);

        //2nd balance check including fees
        const ustBalance = getTokenBalance(coins, denoms.uusd);
        if (feeNum >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
          return;
        }

        dispatch(setFee({ fee: feeNum }));
=======
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
>>>>>>> master
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
<<<<<<< HEAD
  }, [wallet, coins, isDirty, isValid]);
=======
  }, [wallet, coins, mainBalance, isDirty, isValid]);
>>>>>>> master

  return { wallet, maxFee };

  //return estimated fee computed using max constraints
}

function create_placeholder(num_bytes = 1) {
  return Array(num_bytes).fill("a").join("");
}
