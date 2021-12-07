import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Halo from "contracts/Halo";
import { GovStaker } from "contracts/types";
import { useMemo } from "react";
import { terra } from "services/terra/terra";
import { gov_config, gov_state, halo_info, poll, staker } from "./placeholders";

function useHaloContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Halo(wallet), [wallet]);
  return { wallet, contract };
}

export function useLatestBlock() {
  const { useLatestBlockQuery } = terra;
  const { data = "0" } = useLatestBlockQuery("", {
    pollingInterval: 10_000,
  });

  return data;
}

export function useBalances(main: denoms, others?: denoms[]) {
  const wallet = useConnectedWallet();
  const { useBalancesQuery } = terra;
  const { data = [] } = useBalancesQuery(wallet?.walletAddress, {
    skip: wallet === undefined,
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

export function useGovStaker(): [GovStaker, () => void] {
  const { useGovStakerQuery } = terra;
  const { wallet, contract } = useHaloContract();

  const { data = staker, refetch } = useGovStakerQuery(
    {
      address: contract.gov_address,
      msg: { staker: { address: wallet?.walletAddress } },
    },
    { skip: wallet === undefined }
  );

  return [data, refetch];
}

export function useGovBalance() {
  const { useHaloBalanceQuery } = terra;
  const { contract } = useHaloContract();
  const { data = 0 } = useHaloBalanceQuery({
    address: contract.token_address,
    //this query will only run if wallet is not undefined
    msg: { balance: { address: contract.gov_address } },
  });
  return data;
}

export function useGovState() {
  const { useGovStateQuery } = terra;
  const { contract } = useHaloContract();
  const { data = gov_state } = useGovStateQuery({
    address: contract.gov_address,
    msg: { state: {} },
  });

  return data;
}

export function useGovPolls() {
  const { useGovPollsQuery } = terra;
  const { contract } = useHaloContract();
  const { data = [] } = useGovPollsQuery({
    address: contract.gov_address,
    msg: { polls: {} },
  });

  return data;
}

export function useGovPoll(poll_id?: string) {
  const { useGovPollsQuery } = terra;
  const { contract } = useHaloContract();
  const { data = poll } = useGovPollsQuery(
    {
      address: contract.gov_address,
      msg: { polls: {} },
    },
    {
      selectFromResult: ({ data }) => ({
        data: data?.find((poll) => poll.id === +(poll_id || "0")),
      }),
    }
  );
  return data;
}

export function useGovConfig() {
  const { useGovConfigQuery } = terra;
  const { contract } = useHaloContract();
  const { data = gov_config } = useGovConfigQuery({
    address: contract.gov_address,
    msg: { config: {} },
  });

  return data;
}
