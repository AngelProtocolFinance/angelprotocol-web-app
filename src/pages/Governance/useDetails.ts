import { useMemo, useState, useEffect } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import {
  useGovPollsQuery,
  useGovStateQuery,
  useGovConfigQuery,
} from "services/terra/terra";
import { Poll } from "services/terra/types";
import toCurrency from "helpers/toCurrency";
import Halo from "contracts/Halo";

type ProcessedPollData = {
  id: number;
  status: string;
  title: string;
  creator: string;
  amount: string;
  end_height: number;
  link: string;
  description: string;
  yes_pct: string; //0.01 %
  no_pct: string; //0.02%
  voted_pct: string; //0.03%
  quorum_val: string; //Quorum 10%
  yes_val: string; //10 HALO
  no_val: string; //10 HALO
};

export default function useDetails(poll_id?: string): ProcessedPollData {
  const [data, setData] = useState<ProcessedPollData>(placeholder_data);
  const wallet = useConnectedWallet();
  const gov_address = useMemo(() => new Halo(wallet).gov_address, [wallet]);

  const { data: gov_config } = useGovConfigQuery({
    address: gov_address,
    msg: { config: {} },
  });

  const { data: gov_polls } = useGovPollsQuery({
    address: gov_address,
    msg: { polls: {} },
  });

  const { data: gov_state } = useGovStateQuery({
    address: gov_address,
    msg: { state: {} },
  });

  console.log(data);

  useEffect(() => {
    const poll: Poll =
      gov_polls?.find((poll) => poll.id === Number(poll_id || "0")) ||
      placeholder_poll;

    const total_gov_staked = new Dec(gov_state?.total_share || "0");

    const num_yes = new Dec(poll.yes_votes);
    const num_no = new Dec(poll.no_votes);

    const is_staked_zero = total_gov_staked.eq(0);
    const is_votes_zero = num_yes.eq(0) && num_no.eq(0);

    const quorum_pct = new Dec(gov_config?.quorum).mul(100).toNumber();

    const voted_pct = is_staked_zero
      ? 0
      : num_yes.add(num_no).div(total_gov_staked).toNumber();

    const yes_pct = is_votes_zero
      ? 0
      : num_yes.div(num_yes.add(num_no)).toNumber();

    const no_pct = is_votes_zero
      ? 0
      : num_yes.div(num_yes.add(num_no)).toNumber();

    const yes_halo = num_yes.div(1e6).toNumber();
    const no_halo = num_no.div(1e6).toNumber();

    const deposit_amount = new Dec(poll.deposit_amount).div(1e6).toNumber();

    const processed = {
      id: poll.id,
      status: poll.status,
      title: poll.title,
      creator: poll.creator,
      amount: toCurrency(deposit_amount),
      end_height: poll.end_height,
      link: poll.link,
      description: poll.description,
      yes_pct: toCurrency(yes_pct, 2), //0.01 %
      no_pct: toCurrency(no_pct, 2), //0.02%
      voted_pct: toCurrency(voted_pct, 2), //0.03%
      quorum_val: `Quorum ${toCurrency(quorum_pct)} %`, //Quorum 10%
      yes_val: `${toCurrency(yes_halo)} HALO`, //10 HALO
      no_val: `${toCurrency(no_halo)} HALO`, //10 HALO
    };

    setData(processed);
  }, [gov_config, gov_polls, gov_state, wallet]);

  return data;

  //instead of passing poll data via router, just find it in cache polls
}

const placeholder_poll: Poll = {
  id: 0,
  creator: "",
  status: "",
  end_height: 0,
  title: "",
  description: ".",
  link: "",
  deposit_amount: "0",
  execute_data: "",
  yes_votes: "0",
  no_votes: "0",
  staked_amount: "0",
  total_balance_at_end_poll: "0",
};

const placeholder_data: ProcessedPollData = {
  id: 0,
  status: "unknown",
  title: "",
  creator: "",
  amount: "0",
  end_height: 0,
  link: "",
  description: "",
  yes_pct: "0.00 %", //0.01 %
  no_pct: "0.00 %", //0.02%
  voted_pct: "0.00 %", //0.03%
  quorum_val: `Quorum 0.00%`, //Quorum 10%
  yes_val: `0 HALO`, //10 HALO
  no_val: `0 HALO`, //10 HALO
};
