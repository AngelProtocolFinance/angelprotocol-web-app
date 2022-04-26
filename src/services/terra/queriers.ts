import { Dec } from "@terra-money/terra.js";
import { terra } from "services/terra/terra";
import Halo, { H, T } from "contracts/Halo";
import useWalletContext from "hooks/useWalletContext";
import { denoms } from "constants/currency";
import { TokenInfo } from "./types";
import { useContract } from "./useContract";

const halo_info: TokenInfo = {
  name: "",
  symbol: "",
  decimals: 0,
  total_supply: "0",
};

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

export function useHaloInfo() {
  const { useHaloInfoQuery } = terra;
  const { contract } = useContract<H, T>(Halo);
  const { data = halo_info } = useHaloInfoQuery({
    address: contract.token_address,
    msg: { token_info: {} },
  });

  return data;
}

export function useHaloBalance(customAddr?: string) {
  const { useCW20BalanceQuery } = terra;
  const { contract, wallet } = useContract<H, T>(Halo);
  const {
    data = 0,
    isLoading,
    isFetching,
    isError,
  } = useCW20BalanceQuery(
    {
      address: contract.token_address,
      //this query will only run if wallet is not undefined
      msg: { balance: { address: customAddr || wallet?.address } },
    },
    { skip: wallet === undefined }
  );

  return {
    haloBalance: data,
    haloBalanceLoading: isLoading || isFetching,
    isHaloBalanceFailed: isError,
  };
}

export function useCw20TokenBalance(
  contract_address: string,
  customAddr?: string
) {
  const { useCW20BalanceQuery } = terra;
  const { wallet } = useWalletContext();
  const {
    data = 0,
    isLoading,
    isFetching,
    isError,
  } = useCW20BalanceQuery(
    {
      address: contract_address,
      //this query will only run if wallet is not undefined
      msg: { balance: { address: customAddr || wallet?.address } },
    },
    { skip: !contract_address }
  );
  return {
    tokenBalance: data,
    tokenBalanceLoading: isLoading || isFetching,
    isTokenBalanceFailed: isError,
  };
}
