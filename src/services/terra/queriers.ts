/**
 * queriers are hooks that calls the API when there's no entry on cache
 */
import { Dec } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Halo, { H, T } from "contracts/Halo";
import useWalletContext from "hooks/useWalletContext";
import { terra } from "services/terra/terra";
import { halo_info } from "./placeholders";
import { useContract } from "./useContract";

export function useLatestBlock() {
  const { useLatestBlockQuery } = terra;
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
      msg: { balance: { address: wallet?.address } },
    },
    { skip: wallet === undefined }
  );

  return { haloBalance: data, haloBalanceLoading: isLoading || isFetching };
}
