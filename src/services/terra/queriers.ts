/**
 * queriers are hooks that calls the API when there's no entry on cache
 */
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import { terra } from "services/terra/terra";
import {
  gov_config,
  gov_state,
  halo_info,
  staker,
  poll,
  pairInfo,
  simulation,
  pool_balance,
} from "./placeholders";
import { chainIDs } from "contracts/types";
import { useHaloContract, useLPContract } from "./contracts";

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

export function useGovStaker() {
  const { useGovStakerQuery } = terra;
  const { wallet, contract } = useHaloContract();
  const { data = staker } = useGovStakerQuery(contract.staker, {
    skip:
      wallet === undefined || wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}

export function useGovBalance() {
  const { useGovBalanceQuery } = terra;
  const { contract, wallet } = useHaloContract();
  const { data = 0 } = useGovBalanceQuery(contract.gov_balance, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}

export function useGovState() {
  const { useGovStateQuery } = terra;
  const { contract, wallet } = useHaloContract();
  const { data = gov_state } = useGovStateQuery(contract.gov_state, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });

  return data;
}

export function useGovPolls() {
  const { useGovPollsQuery } = terra;
  const { contract, wallet } = useHaloContract();
  const { data = [] } = useGovPollsQuery(contract.polls, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });

  return data;
}

export function useGovPoll(poll_id?: string) {
  const { useGovPollsQuery } = terra;
  const { contract, wallet } = useHaloContract();
  const { data = poll } = useGovPollsQuery(contract.polls, {
    selectFromResult: ({ data }) => ({
      data: data?.find((poll) => poll.id === +(poll_id || "0")),
    }),
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}

export function useGovConfig() {
  const { useGovConfigQuery } = terra;
  const { contract, wallet } = useHaloContract();
  const { data = gov_config } = useGovConfigQuery(
    {
      address: contract.gov_address,
      msg: { config: {} },
    },
    {
      skip: wallet && wallet.network.chainID === chainIDs.localterra,
    }
  );
  return data;
}

export function usePairInfo() {
  const { usePairInfoQuery } = terra;
  const { contract, wallet } = useLPContract();
  const { data = pairInfo } = usePairInfoQuery(contract.pairInfo, {
    skip: wallet?.network.chainID === chainIDs.testnet,
  });

  return data;
}

// TODO: implement fetching
export function useGovStakingAPY() {
  return 13.45;
}

export function usePairSimul(interval = 0, skip = false) {
  const { usePairSimulQuery } = terra;
  const { contract, wallet } = useLPContract();
  const { data = simulation } = usePairSimulQuery(contract.simul, {
    skip: skip || wallet?.network.chainID === chainIDs.testnet,
    pollingInterval: interval,
  });

  return data;
}

export function usePool(skip = false) {
  const { usePoolQuery } = terra;
  const { contract, wallet } = useLPContract();
  const { data = pool_balance } = usePoolQuery(contract.pool, {
    skip: skip || wallet?.network.chainID === chainIDs.testnet,
  });
  return data;
}
