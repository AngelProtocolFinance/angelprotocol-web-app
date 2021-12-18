import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import { useEffect } from "react";
import { denoms } from "constants/currency";
import { DWindow } from "types/window";
import { useWallet } from "use-wallet";
import { useSetter } from "store/accessors";
import { setFormError } from "services/transaction/transactionSlice";

const dwindow: DWindow = window;
export default function useBTCEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    formState: { isValid },
  } = useFormContext<Values>();
  const wallet = useWallet();
  const currency = watch("currency");

  useEffect(() => {
    (async () => {
      try {
        if (!isValid) return;
        //don't run this estimator when currency is not UST
        if (currency !== denoms.btc) {
          return;
        }
        dispatch(setFormError(""));
        const provider = dwindow?.xfi?.bitcoin;

        if (!wallet.ethereum || !provider) {
          dispatch(setFormError("Bitcoin wallet is not connected"));
          return;
        }
      } catch (err) {
        dispatch(setFormError("Unknown error occured"));
      }
    })();
    //eslint-disable-next-line
  }, [wallet, currency]);
}
