import { Dec } from "@terra-money/terra.js";
import { useMemo } from "react";
import { useHaloBalance } from "services/terra/queriers";
import { useGovStaker } from "services/terra/gov/queriers";

export default function useStakerBalance(is_stake: boolean) {
  const gov_staker = useGovStaker();
  const { haloBalance } = useHaloBalance();

  const [balance, locked] = useMemo((): [Dec, Dec] => {
    const staked = new Dec(gov_staker.balance);
    if (is_stake) {
      return [new Dec(haloBalance).mul(1e6), new Dec(0)];
    } else {
      //used in voting to a poll
      const vote_locked = gov_staker.locked_balance.reduce(
        (res, bal) => res.add(new Dec(bal[1].balance)),
        new Dec(0)
      );
      return [staked, vote_locked];
    }
    // is_stake ? haloBalance : new Dec(gov_staker.balance).div(1e6).toNumber();
  }, [gov_staker, haloBalance, is_stake]);

  return { balance, locked };
}
