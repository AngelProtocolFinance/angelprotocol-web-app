import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Coin, LCDClient } from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { denoms } from "constants/currency";

export default function useTerraBalance(main: denoms, others?: denoms[]) {
  const [_others, set_others] = useState<Coin.Data[]>([]);
  const [_main, set_main] = useState<number>(0);
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      if (!wallet) {
        set_others([]);
        set_main(0);
        return;
      }

      const client = new LCDClient({
        URL: wallet.network.lcd,
        chainID: wallet.network.chainID,
      });
      const [coins] = await client.bank.balance(wallet.terraAddress);
      const coin_main = coins.get(main);
      const _others = coins
        .map((coin) => coin.mul(1e-6).toData())
        .filter((coin) =>
          others ? others.includes(coin.denom as denoms) : true
        );
      const _main = coin_main?.mul(1e-6).amount.toNumber() || 0;

      set_main(_main);
      set_others(_others);
    })();
    //eslint-disable-next-line
  }, [wallet]);

  return { main: _main, others: _others };
}
