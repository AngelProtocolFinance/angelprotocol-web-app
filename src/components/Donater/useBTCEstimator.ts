import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import { useEffect } from "react";
import { denoms } from "constants/currency";
import { DWindow } from "types/window";
import { useWallet } from "use-wallet";

const dwindow: DWindow = window;
export default function useBTCEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const wallet = useWallet();
  const currency = watch("currency");

  useEffect(() => {
    (async () => {
      try {
        //don't run this estimator when currency is not UST
        if (currency !== denoms.btc) {
          return;
        }
        setValue("form_error", "");
        const provider = dwindow?.xfi?.bitcoin;

        if (!wallet.ethereum || !provider) {
          setValue("form_error", "Bitcoin wallet is not connected");
          return;
        }
      } catch (err) {
        console.error(err);
        setValue("form_error", "Unknown error occured");
        setValue("loading", false);
      }
    })();
    //eslint-disable-next-line
  }, [wallet, currency]);
}
