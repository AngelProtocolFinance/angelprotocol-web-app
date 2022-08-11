import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { Vote } from "types/server/contracts";
import { PollStatus } from "types/server/contracts";
import {
  useGovConfig,
  useGovHaloBalance,
  useGovPoll,
  useGovStaker,
} from "services/juno/gov/queriers";
import { useLatestBlock } from "services/juno/queriers";
import { condenseToNum, toCurrency } from "helpers";
import { denoms, symbols } from "constants/currency";

type ProcessedPollData = {
  id: number;
  status: PollStatus;
  title: string;
  creator: string;
  amount: string;
  end_height: number;
  blocks_remaining: number;
  link: string;
  description: string;
  yes_pct: string; //0.01
  no_pct: string; //0.02
  voted_pct: string; //0.03
  quorum_val: string; //Quorum 10%
  yes_val: string; //10.00 HALO
  no_val: string; //10.00 HALO
  vote?: Vote;
  vote_ended: boolean;
};

export default function useDetails(poll_id: number): ProcessedPollData {
  const [data, setData] = useState<ProcessedPollData>(placeholder_data);
  const gov_config = useGovConfig();
  const poll = useGovPoll(poll_id);
  const gov_staked = useGovHaloBalance();
  const gov_staker = useGovStaker();
  const block_height = useLatestBlock();

  useEffect(() => {
    //is voting period expired?
    const curr_block = new Decimal(block_height);
    const end_block = new Decimal(poll.end_height);
    const remaining_blocks = end_block.minus(curr_block);
    const is_expired = remaining_blocks.lt(0);
    //get user vote
    let vote: Vote | undefined = undefined;
    const locked_holding = gov_staker.locked_balance.find(
      ([id]) => id === poll_id
    );

    if (locked_holding) {
      const [, vote_info] = locked_holding;
      vote = vote_info.vote;
    }

    const _gov_staked = new Decimal(poll.staked_amount);

    const num_yes = new Decimal(poll.yes_votes);
    const num_no = new Decimal(poll.no_votes);

    const is_votes_zero = num_yes.eq(0) && num_no.eq(0);

    const quorum_pct = new Decimal(gov_config?.quorum).mul(100).toNumber();

    const voted_pct = _gov_staked.lte(0)
      ? 0
      : num_yes.add(num_no).div(_gov_staked).mul(100).toNumber();

    const yes_pct = is_votes_zero
      ? 0
      : num_yes.div(num_yes.add(num_no)).mul(100).toNumber();

    const no_pct = is_votes_zero
      ? 0
      : num_no.div(num_yes.add(num_no)).mul(100).toNumber();

    const yes_halo = condenseToNum(num_yes);
    const no_halo = condenseToNum(num_no);

    const deposit_amount = condenseToNum(poll.deposit_amount);

    const processed = {
      id: poll.id,
      status: poll.status,
      title: poll.title,
      creator: poll.creator,
      amount: toCurrency(deposit_amount),
      end_height: poll.end_height,
      blocks_remaining: remaining_blocks.toNumber(),
      link: poll.link,
      description: poll.description,
      yes_pct: toCurrency(yes_pct, 2), //0.01
      no_pct: toCurrency(no_pct, 2), //0.02%
      voted_pct: toCurrency(voted_pct, 2), //0.03
      quorum_val: `Quorum ${toCurrency(quorum_pct, 2)}%`,
      yes_val: toCurrency(yes_halo) + " " + symbols[denoms.halo], //10
      no_val: toCurrency(no_halo) + " " + symbols[denoms.halo], //10
      vote,
      vote_ended: is_expired,
    };

    setData(processed);
  }, [gov_config, poll, gov_staker, block_height, poll_id, gov_staked]);

  return data;

  //instead of passing poll data via router, just find it in cache polls
}

const placeholder_data: ProcessedPollData = {
  id: 0,
  status: "in_progress",
  title: "",
  creator: "",
  amount: "0",
  end_height: 0,
  blocks_remaining: 0,
  link: "",
  description: "",
  yes_pct: "0.00", //0.01
  no_pct: "0.00", //0.02%
  voted_pct: "0.00", //0.03%
  quorum_val: `0.00`, //Quorum 10%
  yes_val: `0`, //10 HALO
  no_val: `0`, //10 HALO
  vote_ended: false,
};
