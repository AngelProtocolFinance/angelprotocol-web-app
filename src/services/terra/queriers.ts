/**
 * queriers are hooks that calls the API when there's no entry on cache
 */
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import { terra } from "services/terra/terra";
import { halo_info } from "./placeholders";
import { useContract } from "./useContract";
import Halo, { H, T } from "contracts/Halo";

export function useLatestBlock() {
  const { useLatestBlockQuery } = terra;
  const { data = "0" } = useLatestBlockQuery("", { pollingInterval: 10_000 });
  return data;
}

export function useBalances(main: denoms, others?: denoms[]) {
  const wallet = useConnectedWallet();
  const { useBalancesQuery } = terra;
  const {
    data = [],
    isLoading,
    isFetching,
  } = useBalancesQuery(wallet?.walletAddress, {
    skip: wallet === undefined,
  });

  //convert from utoken to token
  const coins = data.map(({ denom, amount }) => ({
    denom: denom as denoms,
    amount: new Dec(amount).mul(1e-6).toNumber(),
  }));

  const found_main = coins.find((coin) => coin.denom === main);
  const _main = new Dec(found_main?.amount || "0").toNumber();
  const _others = coins.filter((coin) =>
    others ? others.includes(coin.denom) : true
  );

  return {
    main: _main,
    others: _others,
    terraBalancesLoading: isLoading || isFetching,
  };
}

export function useHaloInfo() {
  const { useHaloInfoQuery } = terra;
  const { contract } = useContract<H, T>(Halo);
  const { data = halo_info } = useHaloInfoQuery({
    address: contract.token_address,
    msg: { token_info: {} },
  });

  return data;
}

export function useHaloBalance() {
  const { useHaloBalanceQuery } = terra;
  const { wallet, contract } = useContract<H, T>(Halo);
  const {
    data = 0,
    isLoading,
    isFetching,
  } = useHaloBalanceQuery(
    {
      address: contract.token_address,
      //this query will only run if wallet is not undefined
      msg: { balance: { address: wallet?.walletAddress } },
    },
    { skip: wallet === undefined }
  );

  return { haloBalance: data, haloBalanceLoading: isLoading || isFetching };
}
