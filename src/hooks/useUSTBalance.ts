import { Denom, LCDClient } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";

//can be extended to view balance of different currencies
export default function useUSTBalance(): number {
  const wallet = useConnectedWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      if (!wallet) {
        setBalance(0);
        return;
      }
      const client = new LCDClient({
        URL: wallet.network.lcd,
        chainID: wallet.network.chainID,
      });

      const coins = await client.bank.balance(wallet.terraAddress);
      const UUST_coin = coins.get(Denom.USD);
      if (!UUST_coin) {
        setBalance(0);
        return;
      }
      const UST_coin = UUST_coin.div(1_000_000);
      const amount = UST_coin.toData().amount;
      setBalance(Number(amount));
    })();
  }, [wallet]);

  return balance;
}
