import Gov, { G, TG } from "contracts/Gov";
import { chainIDs } from "constants/chainIDs";
import { placeHolderCW20Info } from "../cw20/queriers";
import { useContract } from "../useContract";
import { gov_api } from "./gov";
import { gov_config, gov_state, poll, staker } from "./placeholders";

export function useGovStaker() {
  const { useGovStakerQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = staker } = useGovStakerQuery(contract.staker, {
    skip:
      wallet === undefined || wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}

export function useGovState() {
  const { useGovStateQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = gov_state } = useGovStateQuery(contract.gov_state, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });

  return data;
}

export function useGovConfig() {
  const { useGovConfigQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = gov_config } = useGovConfigQuery(contract.config, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}

export function useGovPolls() {
  const { useGovPollsQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useGovPollsQuery(contract.polls, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });

  return { govPolls: data, isGovPollsLoading: isFetching || isLoading };
}

export function useGovPoll(poll_id: number) {
  const { useGovPollsQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = poll } = useGovPollsQuery(contract.polls, {
    selectFromResult: ({ data }) => ({
      data: data?.find((poll) => poll.id === poll_id),
    }),
    skip:
      poll_id === 0 ||
      (wallet && wallet.network.chainID === chainIDs.localterra),
  });
  return data;
}

export function useGovHaloBalance() {
  const { useGovHaloBalanceQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = 0 } = useGovHaloBalanceQuery(contract.haloBalance, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}

export function useHaloInfo() {
  const { useHaloInfoQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = placeHolderCW20Info } = useHaloInfoQuery(contract.haloInfo, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}
