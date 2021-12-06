import { Dec } from "@terra-money/terra.js";
import { useState, useEffect } from "react";
import { useGovState, useHaloInfo } from "services/terra/hooks";

export default function useGov() {
  const [shares, setShares] = useState(0);
  const [percentStaked, setPercentStaked] = useState(0);
  const token_info = useHaloInfo();
  const gov_state = useGovState();

  useEffect(() => {
    (async () => {
      const total_shares = new Dec(token_info?.total_supply || "0");
      const halo_shares = new Dec(gov_state?.total_share || "0").mul(1e-6);

      if (total_shares.toNumber() === 0) {
        setShares(halo_shares.toNumber());
        setPercentStaked(0);
        return;
      } else {
        const percent_shares = halo_shares.div(total_shares).mul(100);
        setShares(halo_shares.toNumber());
        setPercentStaked(percent_shares.toNumber());
      }
    })();
  }, [token_info, gov_state]);

  return { shares, percentStaked };
}
