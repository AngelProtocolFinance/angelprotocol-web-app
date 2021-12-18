import { useMemo } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import LBP from "contracts/LBP";
import {
  pool_balance,
  simulation,
  pairInfo as pair_placeholder,
} from "services/terra/placeholders";
import {
  usePairInfoQuery,
  usePairSimulQuery,
  usePoolQuery,
} from "services/terra/terra";
import { getSpotPrice } from "components/Swapper/getSpotPrice";

export default function useAuctionStats() {
  const wallet = useConnectedWallet();
  const lbp = useMemo(() => new LBP(wallet), [wallet]);
  const { data: pairInfo = pair_placeholder } = usePairInfoQuery(
    lbp.gen_pairInfo_args()
  );
  const duration_days = useMemo(() => {
    const now = new Date().getTime();
    const end = new Date(pairInfo.end_time * 1000).getTime();
    const start = new Date(pairInfo.start_time * 1000).getTime();

    if (now < start) {
      return -1;
    } else if (now > end) {
      return 0;
    } else {
      return (end - start) / 1000 / 3600 / 24;
    }
  }, [pairInfo]);

  const { data: pool = pool_balance } = usePoolQuery(lbp.gen_pool_args(), {
    pollingInterval: 3000,
    skip: duration_days == -1 || duration_days === 0,
  });
  const { data: pairSimul = simulation } = usePairSimulQuery(
    lbp.gen_simul_args(),
    { pollingInterval: 3000, skip: duration_days == -1 || duration_days === 0 }
  );

  const ust_price = useMemo(
    () => getSpotPrice(pairSimul, pool),
    [pairSimul, pool]
  );

  return {
    ust_price,
    duration_days,
    start: pairInfo.start_time,
    end: pairInfo.end_time,
  };
}
