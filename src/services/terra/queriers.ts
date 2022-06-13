import { terra } from "services/terra/terra";

export function useLatestBlock(pollInterval = 0) {
  const { useLatestBlockQuery } = terra;
<<<<<<< HEAD
  const { data = "0" } = useLatestBlockQuery("", {
    pollingInterval: pollInterval,
  });
=======
  const { data = "0" } = useLatestBlockQuery("", { pollingInterval: 10_000 });
  return data;
}

export function useBalances(mainDenom: denoms, otherDenoms?: denoms[]) {
  const { wallet } = useWalletContext();
  const { useBalancesQuery } = terra;
  const {
    data = [],
    isLoading,
    isFetching,
  } = useBalancesQuery(wallet?.address, {
    skip: wallet === undefined,
  });

  //convert from utoken to token
  const coins = data.map(({ denom, amount }) => ({
    denom: denom as denoms,
    amount: new Dec(amount).mul(1e-6).toNumber(),
  }));

  const main = coins.find((coin) => coin.denom === mainDenom) ?? {
    amount: new Dec("0").toNumber(),
    denom: mainDenom,
  };
  const others = coins.filter((coin) =>
    otherDenoms ? otherDenoms.includes(coin.denom) : true
  );

  return {
    main,
    others,
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

>>>>>>> master
  return data;
}
