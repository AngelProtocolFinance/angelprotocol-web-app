/**
 * queriers are hooks that calls the API when there's no entry on cache
 */
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import { terra } from "services/terra/terra";
import { halo_info } from "./placeholders";
import { useHaloContract } from "./contracts";
import Registrar from "contracts/Registrar";
import { useMemo } from "react";

export function useRegistrarContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Registrar(wallet), [wallet]);
  return { wallet, contract };
}

export function useLatestBlock() {
  const { useLatestBlockQuery } = terra;
  const { data = "0" } = useLatestBlockQuery("", { pollingInterval: 10_000 });
  return data;
}

export function useBalances(main: denoms, others?: denoms[]) {
  const wallet = useConnectedWallet();
  const { useBalancesQuery } = terra;
  const { data = [] } = useBalancesQuery(wallet?.walletAddress, {
    skip: wallet === undefined,
    refetchOnMountOrArgChange: true,
  });

  //convert from utoken to token
  const coins = data.map(({ denom, amount }) => ({
    denom,
    amount: new Dec(amount).mul(1e-6).toString(),
  }));

  const found_main = coins.find((coin) => coin.denom === main);
  const _main = new Dec(found_main?.amount || "0").toNumber();
  const _others = coins.filter((coin) =>
    others ? others.includes(coin.denom as denoms) : true
  );

  return { main: _main, others: _others };
}

export function useHaloInfo() {
  const { useHaloInfoQuery } = terra;
  const { contract } = useHaloContract();
  const { data = halo_info } = useHaloInfoQuery({
    address: contract.token_address,
    msg: { token_info: {} },
  });

  return data;
}

export function useHaloBalance() {
  const { useHaloBalanceQuery } = terra;
  const { wallet, contract } = useHaloContract();
  const { data = 0 } = useHaloBalanceQuery(
    {
      address: contract.token_address,
      //this query will only run if wallet is not undefined
      msg: { balance: { address: wallet?.walletAddress } },
    },
    { skip: wallet === undefined }
  );

  return data;
}
