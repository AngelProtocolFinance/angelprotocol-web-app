import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Coin, LCDClient } from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { denoms } from "constants/currency";

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
      const ustCoin = coins.get(denoms.uusd);
      const balance = coins.map((coin) => coin.mul(1e-6).toData());
      // const ustCoin = balance.find((coin) => coin.denom === Denoms.UUSD);
      const ustAmount = ustCoin?.mul(1e-6).amount.toNumber() || 0;
      setCoins(balance);
      setUstAmount(ustAmount);
    })();
  }, [wallet]);

  return { ustAmount, coins };
}
