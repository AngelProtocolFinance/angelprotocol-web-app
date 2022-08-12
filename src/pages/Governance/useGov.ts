import Decimal from "decimal.js";
import { useEffect, useMemo, useState } from "react";
import { useGovHaloBalance, useHaloInfo } from "services/juno/gov/queriers";
import { usePairSimul } from "services/juno/lp/queriers";
import { getSpotPrice } from "components/Transactors/Swapper/getSpotPrice";
import { scale } from "helpers";

export default function useGov() {
  const [staked, setStaked] = useState(0);
  const [percentStaked, setPercentStaked] = useState(0);

  const simul = usePairSimul();
  const spot_price = useMemo(() => getSpotPrice(simul), [simul]);
  const haloInfo = useHaloInfo();
  const govHaloBalance = useGovHaloBalance();

  useEffect(() => {
    (async () => {
      const haloSupply = new Decimal(haloInfo.total_supply);
      const haloBalance = new Decimal(govHaloBalance);
      const _staked = haloBalance.toNumber();
      const _pct_staked = haloSupply.lte(0)
        ? 0
        : //convert back to utoken
          scale(haloBalance).div(haloSupply).mul(100).toNumber();

      setStaked(_staked);
      setPercentStaked(_pct_staked);
    })();
  }, [haloInfo, govHaloBalance]);

  return { staked, percentStaked, spot_price: spot_price.toNumber() };
}
