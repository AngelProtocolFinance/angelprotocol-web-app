import { useMemo } from "react";
import { useGovStaker } from "services/terra/gov/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Decimal from "helpers/Decimal";
import getTokenBalance from "helpers/getTokenBalance";
import { denoms } from "constants/currency";

export default function useStakerBalance(is_stake: boolean) {
  const gov_staker = useGovStaker();
  const { wallet } = useGetWallet();

  const [balance, locked] = useMemo((): [Decimal, Decimal] => {
    const haloBalance = getTokenBalance(wallet?.coins || [], denoms.halo);
    if (is_stake) {
      return [new Decimal(haloBalance).multiply(1e6), new Decimal(0)];
    } else {
      //used in voting to a poll
      const vote_locked = gov_staker.locked_balance.reduce(
        (res, [, vote]) =>
          //get max vote locked
          new Decimal(vote.balance).isGreaterThan(res)
            ? new Decimal(vote.balance)
            : res,
        new Decimal(0)
      );
      return [new Decimal(gov_staker.balance), vote_locked];
    }
    // is_stake ? haloBalance : new Decimal(gov_staker.balance).div(1e6).toNumber();
  }, [gov_staker, wallet, is_stake]);

  return { balance, locked };
}
