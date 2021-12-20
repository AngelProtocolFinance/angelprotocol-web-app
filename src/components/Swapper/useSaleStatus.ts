import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useMemo } from "react";
import LBP from "contracts/LBP";
import { terra } from "services/terra/terra";
import { pairInfo as pair_placeholder } from "services/terra/placeholders";

export default function useSaleStatus() {
  const wallet = useConnectedWallet();
  const lbp = useMemo(() => new LBP(wallet), [wallet]);
  const { data: pairInfo = pair_placeholder } =
    terra.endpoints.pairInfo.useQueryState(lbp.gen_pairInfo_args());

  const [is_live, message] = useMemo(() => {
    const now = new Date().getTime();
    const end = new Date(pairInfo.end_time * 1000).getTime();
    const start = new Date(pairInfo.start_time * 1000).getTime();

    if (now < start) {
      return [false, "Sale hasn't started"];
    } else if (now >= end) {
      return [false, "Sale has ended"];
    } else {
      return [true, ""];
    }
  }, [pairInfo]);

  return {
    is_live,
    message,
    end: pairInfo.end_time,
    start: pairInfo.start_time,
  };
}
