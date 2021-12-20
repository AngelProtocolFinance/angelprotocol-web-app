import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { getSpotPrice } from "components/Swapper/getSpotPrice";
import LBP from "contracts/LBP";
import {
  usePairInfoQuery,
  usePairSimulQuery,
  usePoolQuery,
} from "services/terra/terra";
import { useState, useEffect, useMemo } from "react";
import { useGovBalance, useHaloInfo } from "services/terra/hooks";
import {
  pool_balance,
  simulation,
  pairInfo as pair_placeholder,
} from "services/terra/placeholders";

export default function useGov() {
  const wallet = useConnectedWallet();
  const [staked, setStaked] = useState(0);
  const [percentStaked, setPercentStaked] = useState(0);
  const lbp = useMemo(() => new LBP(wallet), [wallet]);
  const { data: pairInfo = pair_placeholder } = usePairInfoQuery(
    lbp.gen_pairInfo_args()
  );
  const is_live = useMemo(() => {
    const now = new Date().getTime();
    const end = new Date(pairInfo.end_time * 1000).getTime();
    const start = new Date(pairInfo.start_time * 1000).getTime();
    return now >= start && now < end;
  }, [pairInfo]);

  const { data: pool = pool_balance } = usePoolQuery(lbp.gen_pool_args(), {
    skip: !is_live,
  });
  const { data: simul = simulation } = usePairSimulQuery(lbp.gen_simul_args(), {
    skip: !is_live,
  });
  const spot_price = useMemo(() => getSpotPrice(simul, pool), [simul, pool]);
  const token_info = useHaloInfo();
  const gov_balance = useGovBalance();

  useEffect(() => {
    (async () => {
      const halo_supply = new Dec(token_info.total_supply);
      const halo_balance = new Dec(gov_balance);
      const _staked = halo_balance.toNumber();
      const _pct_staked = halo_supply.lte(0)
        ? 0
        : //convert back to utoken
          halo_balance.mul(1e6).div(halo_supply).mul(100).toNumber();

      setStaked(_staked);
      setPercentStaked(_pct_staked);
    })();
  }, [token_info, gov_balance]);

  return { staked, percentStaked, spot_price };
}
