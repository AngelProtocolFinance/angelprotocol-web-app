import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreatePollValues } from "./types";
import { SigningCosmWasmClient, StdFee } from "types/third-party/cosmjs";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Gov from "contracts/Gov";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { getCosmosClient, getFee, getFeeNum } from "helpers/third-party/cosmjs";
import { denoms } from "constants/currency";

let client: SigningCosmWasmClient;
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
          dispatch(setFormError("Terra wallet is not connected"));
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
        if (!client) client = await getCosmosClient();
        const contract = new Gov(wallet.address);
        const pollMsgs = await contract.createPollMsgs(
          amount,
          //just set max contraints for estimates to avoid
          //estimating fee on different string lengths
          create_placeholder(64),
          create_placeholder(1024),
          create_placeholder(128)
        );

        //max fee estimate with extreme payload
        const gas = await client.simulate(
          wallet.address,
          [pollMsgs],
          undefined
        );
        const fee = getFee(gas);
        const feeNum = getFeeNum(fee);

        //2nd balance check including fees
        const ustBalance = getTokenBalance(wallet.coins, denoms.uusd);
        if (feeNum >= ustBalance) {
          setError("amount", { message: "not enough UST to pay for fees" });
          return;
        }

        dispatch(setFee(feeNum));
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
