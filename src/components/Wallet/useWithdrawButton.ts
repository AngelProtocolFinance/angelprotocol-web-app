import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Registrar from "contracts/Registrar";

export default function useWithdrawButton() {
  const [isCharityOwner, setCharityOwner] = useState(false);
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      try {
        const chainID = wallet?.network.chainID;
        const url = wallet?.network.lcd;
        // const walletAddress = wallet?.walletAddress;
        const walletAddress = "terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh"; //Hard coded for now

        const _endowments = await Registrar.getEndowmentList(chainID, url);
        _endowments.map((endowment) => {
          if (endowment.address === walletAddress) {
            setCharityOwner(true);
          }
        });
      } catch (err) {
        console.log(err);
        setCharityOwner(false);
      }
    })();
  }, [wallet]);

  return { isCharityOwner };
}
