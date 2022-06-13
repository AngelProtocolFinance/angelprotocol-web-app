<<<<<<< HEAD
import Gov, { G, TG } from "contracts/Gov";
import { chainIDs } from "constants/chainIDs";
import { CW20Info } from "../multicall/types";
=======
import Halo, { H, T } from "contracts/Halo";
import { gov_api } from "./gov";
import { gov_config, gov_state, staker, poll } from "./placeholders";
>>>>>>> master
import { useContract } from "../useContract";
import { gov_api } from "./gov";
import { gov_config, gov_state, poll, staker } from "./placeholders";

export function useGovStaker() {
  const { useGovStakerQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = staker } = useGovStakerQuery(contract.staker, {
<<<<<<< HEAD
    skip:
      wallet === undefined || wallet.network.chainID === chainIDs.terra_local,
  });
=======
    skip: wallet === undefined,
  });
  return data;
}

export function useGovBalance() {
  const { useGovBalanceQuery } = gov_api;
  const { contract } = useContract<H, T>(Halo);
  const { data = 0 } = useGovBalanceQuery(contract.gov_balance);
>>>>>>> master
  return data;
}

export function useGovState() {
  const { useGovStateQuery } = gov_api;
<<<<<<< HEAD
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = gov_state } = useGovStateQuery(contract.gov_state, {
    skip: wallet && wallet.network.chainID === chainIDs.terra_local,
  });
=======
  const { contract } = useContract<H, T>(Halo);
  const { data = gov_state } = useGovStateQuery(contract.gov_state);
>>>>>>> master

  return data;
}

export function useGovConfig() {
  const { useGovConfigQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = gov_config } = useGovConfigQuery(contract.config, {
    skip: wallet && wallet.network.chainID === chainIDs.terra_local,
  });
  return data;
}

export function useGovPolls() {
  const { useGovPollsQuery } = gov_api;
<<<<<<< HEAD
  const { wallet, contract } = useContract<G, TG>(Gov);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useGovPollsQuery(contract.polls, {
    skip: wallet && wallet.network.chainID === chainIDs.terra_local,
  });
=======
  const { contract } = useContract<H, T>(Halo);
  const { data = [], isFetching, isLoading } = useGovPollsQuery(contract.polls);
>>>>>>> master

  return { govPolls: data, isGovPollsLoading: isFetching || isLoading };
}

export function useGovPoll(poll_id: number) {
  const { useGovPollsQuery } = gov_api;
<<<<<<< HEAD
  const { wallet, contract } = useContract<G, TG>(Gov);
=======
  const { contract } = useContract<H, T>(Halo);
>>>>>>> master
  const { data = poll } = useGovPollsQuery(contract.polls, {
    selectFromResult: ({ data }) => ({
      data: data?.find((poll) => poll.id === poll_id),
    }),
<<<<<<< HEAD
    skip:
      poll_id === 0 ||
      (wallet && wallet.network.chainID === chainIDs.terra_local),
=======
    skip: poll_id === 0,
>>>>>>> master
  });
  return data;
}

<<<<<<< HEAD
export function useGovHaloBalance() {
  const { useGovHaloBalanceQuery } = gov_api;
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = 0 } = useGovHaloBalanceQuery(contract.haloBalance, {
    skip: wallet && wallet.network.chainID === chainIDs.terra_local,
  });
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
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = placeHolderCW20Info } = useHaloInfoQuery(contract.haloInfo, {
    skip: wallet && wallet.network.chainID === chainIDs.terra_local,
=======
export function useGovConfig() {
  const { useGovConfigQuery } = gov_api;
  const { contract } = useContract<H, T>(Halo);
  const { data = gov_config } = useGovConfigQuery({
    address: contract.gov_address,
    msg: { config: {} },
>>>>>>> master
  });
  return data;
}
