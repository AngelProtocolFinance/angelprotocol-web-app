import { Dec } from "@terra-money/terra.js";
import { useMemo } from "react";
import { useGovStaker } from "services/terra/gov/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import getTokenBalance from "helpers/getTokenBalance";
import { denoms } from "constants/currency";

export default function useStakerBalance(is_stake: boolean) {
  const gov_staker = useGovStaker();
  const { coins } = useGetWallet();

  const [balance, locked] = useMemo((): [Dec, Dec] => {
    const haloBalance = getTokenBalance(coins, denoms.halo);
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
  }, [gov_staker, coins, is_stake]);

  return { balance, locked };
}
