import { CW20Info } from "types/server/contracts";
import Gov, { G, TG } from "contracts/Gov";
import { useContract } from "../useContract";
import { gov_api } from "./gov";
import { gov_config, gov_state, poll, staker } from "./placeholders";

export function useGovStaker() {
  const { useGovStakerQuery } = gov_api;
  const { walletAddr, contract } = useContract<G, TG>(Gov);
  const { data = staker } = useGovStakerQuery(contract.staker, {
    skip: !walletAddr,
  });
  return data;
}

export function useGovState() {
  const { useGovStateQuery } = gov_api;
  const { contract } = useContract<G, TG>(Gov);
  const { data = gov_state } = useGovStateQuery(contract.gov_state);
  return data;
}

export function useGovConfig() {
  const { useGovConfigQuery } = gov_api;
  const { contract } = useContract<G, TG>(Gov);
  const { data = gov_config } = useGovConfigQuery(contract.config);
  return data;
}

export function useGovPolls() {
  const { useGovPollsQuery } = gov_api;
  const { contract } = useContract<G, TG>(Gov);
  const { data = [], isFetching, isLoading } = useGovPollsQuery(contract.polls);

  return { govPolls: data, isGovPollsLoading: isFetching || isLoading };
}

export function useGovPoll(poll_id: number) {
  const { useGovPollsQuery } = gov_api;
  const { contract } = useContract<G, TG>(Gov);
  const { data = poll } = useGovPollsQuery(contract.polls, {
    selectFromResult: ({ data }) => ({
      data: data?.find((poll) => poll.id === poll_id),
    }),
    skip: poll_id === 0,
  });
  return data;
}

export function useGovHaloBalance() {
  const { useGovHaloBalanceQuery } = gov_api;
  const { contract } = useContract<G, TG>(Gov);
  const { data = 0 } = useGovHaloBalanceQuery(contract.haloBalance);
  return data;
}

const placeHolderCW20Info: CW20Info = {
  name: "",
  symbol: "",
  decimals: 6,
  total_supply: "1",
};
export function useHaloInfo() {
  const { useHaloInfoQuery } = gov_api;
  const { contract } = useContract<G, TG>(Gov);
  const { data = placeHolderCW20Info } = useHaloInfoQuery(contract.haloInfo);
  return data;
}
