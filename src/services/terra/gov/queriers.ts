import { gov_api } from "./gov";
import { gov_config, gov_state, staker, poll } from "./placeholders";
import Halo, { H, T } from "contracts/Halo";
import { useContract } from "../useContract";
import { chainIDs } from "constants/chainIDs";

export function useGovStaker() {
  const { useGovStakerQuery } = gov_api;
  const { wallet, contract } = useContract<H, T>(Halo);
  const { data = staker } = useGovStakerQuery(contract.staker, {
    skip:
      wallet === undefined || wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}

export function useGovBalance() {
  const { useGovBalanceQuery } = gov_api;
  const { wallet, contract } = useContract<H, T>(Halo);
  const { data = 0 } = useGovBalanceQuery(contract.gov_balance, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });
  return data;
}

export function useGovState() {
  const { useGovStateQuery } = gov_api;
  const { wallet, contract } = useContract<H, T>(Halo);
  const { data = gov_state } = useGovStateQuery(contract.gov_state, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });

  return data;
}

export function useGovPolls() {
  const { useGovPollsQuery } = gov_api;
  const { wallet, contract } = useContract<H, T>(Halo);
  const { data = [] } = useGovPollsQuery(contract.polls, {
    skip: wallet && wallet.network.chainID === chainIDs.localterra,
  });

  return data;
}

export function useGovPoll(poll_id: number) {
  const { useGovPollsQuery } = gov_api;
  const { wallet, contract } = useContract<H, T>(Halo);
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

export function useGovConfig() {
  const { useGovConfigQuery } = gov_api;
  const { wallet, contract } = useContract<H, T>(Halo);
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
