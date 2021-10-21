import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Coin, LCDClient } from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { Denoms } from "types/currencies";

export default function useBalance() {
  const [coins, setCoins] = useState<Coin.Data[]>([]);
  const [ustAmount, setUstAmount] = useState<number>();
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      if (!wallet) {
        setCoins([]);
        setUstAmount(0);
        return;
      }

      const client = new LCDClient({
        URL: wallet.network.lcd,
        chainID: wallet.network.chainID,
      });

      const coins = await client.bank.balance(wallet.terraAddress);
      const ustCoin = coins.get(Denoms.UUSD);
      const balance = coins.map((coin) => coin.div(1e6).toData());
      // const ustCoin = balance.find((coin) => coin.denom === Denoms.UUSD);
      const ustAmount = (ustCoin?.amount?.toNumber() || 0) / 1e6;
      setCoins(balance);
      setUstAmount(ustAmount);
    })();
  }, [wallet]);

  return { ustAmount, coins };
}
