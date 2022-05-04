import { Dec } from "@terra-money/terra.js";
import { terra } from "services/terra/terra";
import useWalletContext from "hooks/useWalletContext";
import { denoms } from "constants/currency";

export function useLatestBlock(pollInterval = 0) {
  const { useLatestBlockQuery } = terra;
  const { data = "0" } = useLatestBlockQuery("", {
    pollingInterval: pollInterval,
  });
  return data;
}

export function useBalances(
  main: denoms,
  others?: denoms[],
  customAddr?: string
) {
  const { wallet } = useWalletContext();
  const { useBalancesQuery } = terra;
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useBalancesQuery(customAddr || wallet?.address, {
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
    isTerraBalancesFailed: isError,
  };
}
