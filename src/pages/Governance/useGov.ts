import Decimal from "decimal.js";
import { useEffect, useMemo, useState } from "react";
import { usePairSimulQuery } from "services/juno/lp/lp";
import { simulation } from "services/juno/lp/placeholders";
// import { useGovHaloBalance, useHaloInfo } from "services/juno/gov/queriers";
// import { usePairSimul } from "services/juno/lp/queriers";
import { getSpotPrice } from "components/Transactors/Swapper/getSpotPrice";

export default function useGov() {
  const [staked, setStaked] = useState(0);
  const [percentStaked, setPercentStaked] = useState(0);

  const { data: simul = simulation } = usePairSimulQuery(null);
  const spot_price = useMemo(() => getSpotPrice(simul), [simul]);

  //TODO: create custom query for this under juno/custom
  // const haloInfo = useHaloInfo();
  // const govHaloBalance = useGovHaloBalance();

  useEffect(
    () => {
      (async () => {
        const haloSupply = new Decimal(1000);
        const haloBalance = new Decimal(100);
        const _staked = haloBalance.toNumber();
        const _pct_staked = haloSupply.lte(0)
          ? 0
          : //convert back to utoken
            haloBalance.mul(1e6).div(haloSupply).mul(100).toNumber();

        setStaked(_staked);
        setPercentStaked(_pct_staked);
      })();
    },
    [
      /** haloInfo, govHaloBalance */
    ]
  );

  return { staked, percentStaked, spot_price: spot_price.toNumber() };
}
