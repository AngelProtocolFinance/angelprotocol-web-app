import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Halo from "contracts/Halo";
import { useState, useEffect } from "react";
export default function useHaloBalance() {
  const wallet = useConnectedWallet();
  const [halo, setHalo] = useState(0);

  useEffect(() => {
    (async () => {
      const contract = new Halo(wallet);
      const holding = await contract.getHaloBalance();
      const halo = new Dec(holding.balance).mul(1e-6).toNumber();
      setHalo(halo);
    })();
  }, [wallet]);

  return halo;
}
