import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { useState, useEffect, useMemo } from "react";
import { useGovStateQuery, useHaloInfoQuery } from "services/terra/terra";

export default function useGov() {
  const [shares, setShares] = useState(0);
  const [percentStaked, setPercentStaked] = useState(0);
  const wallet = useConnectedWallet();
  const halo_contract = useMemo(() => new Halo(wallet), [wallet]);

  const { data: token_info } = useHaloInfoQuery({
    address: halo_contract.token_address,
    msg: { token_info: {} },
  });
  const { data: gov_state } = useGovStateQuery({
    address: halo_contract.gov_address,
    msg: { state: {} },
  });

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
  }, [token_info, gov_state, wallet]);

  return { shares, percentStaked };
}
