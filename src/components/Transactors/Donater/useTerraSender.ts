import { useCallback } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import { DonateValues } from "./types";
import { useSetter } from "store/accessors";
import { donate } from "services/transaction/terraSender";

export default function useTerraSender(tx: CreateTxOptions) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  //data:Data
  const ustSender = useCallback(
    (data: DonateValues) => {
      dispatch(
        donate({
          wallet,
          tx,
          donateValues: data,
        })
      );
    },
    //eslint-disable-next-line
    [tx]
  );

  return ustSender;
}
