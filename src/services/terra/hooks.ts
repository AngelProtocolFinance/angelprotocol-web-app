import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Halo from "contracts/Halo";
import LBP from "contracts/LBP";
import { useMemo } from "react";
import { terra } from "services/terra/terra";
import {
  gov_config,
  gov_state,
  halo_info,
  pairInfo,
  poll,
  simulation,
  staker,
} from "./placeholders";
import Registrar from "contracts/Registrar";

function useHaloContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Halo(wallet), [wallet]);
  return { wallet, contract };
}

function useLBPContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new LBP(wallet), [wallet]);
  return { wallet, contract };
}

export function useRegistrarContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Registrar(wallet), [wallet]);
  return { wallet, contract };
}

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

  const { data = staker } = useGovStakerQuery(
    {
      address: contract.gov_address,
      msg: { staker: { address: wallet?.walletAddress } },
    },
    { skip: wallet === undefined }
  );

  return data;
}

export function useGovBalance() {
  const { useGovBalanceQuery } = terra;
  const { contract } = useHaloContract();
  const { data = 0 } = useGovBalanceQuery({
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

//PairContract
export function usePairInfo() {
  const { usePairInfoQuery } = terra;
  const { contract } = useLBPContract();
  const { data = pairInfo } = usePairInfoQuery({
    address: contract.pair_address,
    msg: {
      pair: {
        asset_infos: [
          { token: { contract_addr: contract.token_address } },
          { native_token: { denom: "uusd" } },
        ],
      },
    },
  });

  return data;
}

export function usePairSimul() {
  //is_buy: true // your are buying HALO
  //is_buy: false // you are selling HALO

  const { usePairSimulQuery } = terra;
  const { contract } = useLBPContract();

  const { data = simulation } = usePairSimulQuery(
    {
      address: contract.pair_address,
      msg: {
        simulation: {
          offer_asset: {
            info: {
              native_token: {
                denom: "uusd",
              },
            },
            amount: (1e6).toString(),
          },
          block_time: Math.round(new Date().getTime() / 1000 + 10),
        },
      },
    },
    { pollingInterval: 3000 }
  );

  return data;
}
