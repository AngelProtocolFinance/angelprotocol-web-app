import { Dec } from "@terra-money/terra.js";
import { getSpotPrice } from "components/Swapper/getSpotPrice";
import { useState, useEffect, useMemo } from "react";
import {
  useGovBalance,
  useHaloInfo,
  usePairInfo,
  usePairSimul,
  usePool,
} from "services/terra/queriers";

export default function useGov() {
  const [staked, setStaked] = useState(0);
  const [percentStaked, setPercentStaked] = useState(0);

  const pairInfo = usePairInfo();

  const is_live = useMemo(() => {
    const now = new Date().getTime();
    const end = new Date(pairInfo.end_time * 1000).getTime();
    const start = new Date(pairInfo.start_time * 1000).getTime();
    return now >= start && now < end;
  }, [pairInfo]);

  const pool = usePool(!is_live);
  const simul = usePairSimul(!is_live);

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
