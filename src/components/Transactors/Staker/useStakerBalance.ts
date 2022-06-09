import { Dec } from "@terra-money/terra.js";
import { useMemo } from "react";
import { useGovStaker } from "services/terra/gov/queriers";
import { denoms } from "constants/currency";
import getTokenBalance from "helpers/getTokenBalance";
import { useGetter } from "store/accessors";

export default function useStakerBalance(is_stake: boolean) {
  const { coins } = useGetter((state) => state.wallet);
  const haloBalance = getTokenBalance(coins, denoms.uhalo);
  const gov_staker = useGovStaker();

  const [balance, locked] = useMemo((): [Dec, Dec] => {
    const staked = new Dec(gov_staker.balance);
    if (is_stake) {
      return [new Dec(haloBalance).mul(1e6), new Dec(0)];
    } else {
      //used in voting to a poll
      const vote_locked = gov_staker.locked_balance.reduce(
        (res, [, vote]) =>
          //get max vote locked
          new Dec(vote.balance).gt(res) ? new Dec(vote.balance) : res,
        new Dec(0)
      );
      return [staked, vote_locked];
    }
    // is_stake ? haloBalance : new Dec(gov_staker.balance).div(1e6).toNumber();
  }, [gov_staker, haloBalance, is_stake, coins]);

  return { balance, locked };
}
