import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Dec } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { useState, useEffect } from "react";

export default function useGov() {
  const [shares, setShares] = useState(0);
  const [percentStaked, setPercentStaked] = useState(0);
  const wallet = useConnectedWallet();
  useEffect(() => {
    (async () => {
      const contract = new Halo(wallet);
      const gov_state = await contract.getGovState();
      const token_info = await contract.getHaloInfo();
      const total_shares = new Dec(token_info.total_supply);
      const halo_shares = new Dec(gov_state.total_share).mul(1e-6);
      const percent_shares = halo_shares.div(total_shares).mul(100);
      setShares(halo_shares.toNumber());
      setPercentStaked(percent_shares.toNumber());
    })();
  }, [wallet]);

  return { shares, percentStaked };
}
