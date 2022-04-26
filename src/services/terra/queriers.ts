import { Dec } from "@terra-money/terra.js";
import { Denoms } from "@types-lists";
import { TokenInfo } from "@types-server/contracts";
import { terra } from "services/terra/terra";
import Halo, { H, T } from "contracts/Halo";
import useWalletContext from "hooks/useWalletContext";
import { useContract } from "./useContract";

const haloPlaceHolderInfo: TokenInfo = {
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
  main: Denoms,
  others?: Denoms[],
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
    denom: denom as Denoms,
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
  const { data = haloPlaceHolderInfo } = useHaloInfoQuery({
    address: contract.token_address,
    msg: { token_info: {} },
  });

  return data;
}

export function useHaloBalance(customAddr?: string) {
  const { useHaloBalanceQuery } = terra;
  const { contract, wallet } = useContract<H, T>(Halo);
  const {
    data = 0,
    isLoading,
    isFetching,
    isError,
  } = useHaloBalanceQuery(
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
