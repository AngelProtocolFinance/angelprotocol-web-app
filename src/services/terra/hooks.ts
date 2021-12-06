import { useConnectedWallet } from "@terra-money/wallet-provider";
import Halo from "contracts/Halo";
import { useMemo } from "react";
import { terra } from "services/terra/terra";
import { gov_config, gov_state, halo_info, staker } from "./placeholders";

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
  const { data = staker } = useGovStakerQuery(
    {
      address: contract.gov_address,
      msg: { staker: { address: wallet?.walletAddress } },
    },
    { skip: wallet === undefined }
  );

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

export function useGovConfig() {
  const { useGovConfigQuery } = terra;
  const { contract } = useHaloContract();
  const { data = gov_config } = useGovConfigQuery({
    address: contract.gov_address,
    msg: { config: {} },
  });

  return data;
}
