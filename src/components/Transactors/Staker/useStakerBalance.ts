import Decimal from "decimal.js";
import { useMemo } from "react";
import { useGovStaker } from "services/juno/gov/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { getTokenBalance, scale } from "helpers";
import { denoms } from "constants/currency";

export default function useStakerBalance(is_stake: boolean) {
  const gov_staker = useGovStaker();
  const { wallet } = useGetWallet();

  const [balance, locked] = useMemo((): [Decimal, Decimal] => {
    const haloBalance = getTokenBalance(wallet?.coins || [], denoms.halo);
    const staked = new Decimal(gov_staker.balance);
    if (is_stake) {
      return [scale(haloBalance), new Decimal(0)];
    } else {
      //used in voting to a poll
      const vote_locked = gov_staker.locked_balance.reduce(
        (res, [, vote]) =>
          //get max vote locked
          new Decimal(vote.balance).gt(res) ? new Decimal(vote.balance) : res,
        new Decimal(0)
      );
      return [staked, vote_locked];
    }
    // is_stake ? haloBalance : condenseToNum(gov_staker.balance)
  }, [gov_staker, wallet, is_stake]);

  return { balance, locked };
}
