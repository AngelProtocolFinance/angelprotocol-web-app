import { useMemo } from "react";
import CW20 from "contracts/CW20";
import useWalletContext from "hooks/useWalletContext";

export default function useCW20Contract(cw20ContractAddr: string) {
  const { wallet } = useWalletContext();
  const contract = useMemo(
    () => new CW20(cw20ContractAddr, wallet),
    [wallet, cw20ContractAddr]
  );
  return { wallet, contract };
}
