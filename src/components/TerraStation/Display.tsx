import { useConnectedWallet } from "@terra-dev/use-wallet";
import { LCDClient } from "@terra-money/terra.js";
import { useEffect } from "react";

export default function Display() {
  //this component won't be rendered if wallet is not connected
  const wallet = useConnectedWallet()!;

  useEffect(() => {
    (async () => {
      const client = new LCDClient({
        URL: wallet.network.lcd,
        chainID: wallet.network.chainID,
      });

      const coins = await client.bank.balance(wallet.terraAddress);
      const balance = coins.map((coin) => coin.toData);
      console.log(balance);
    })();
  }, []);

  return <div>Display</div>;
}
