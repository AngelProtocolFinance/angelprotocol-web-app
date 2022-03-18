import { useMemo } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Admin, { CWContracts } from "contracts/Admin";

export default function useAdminContract(contracts: CWContracts) {
  const wallet = useConnectedWallet();

  const contract = useMemo(
    () => new Admin(contracts, wallet),
    [wallet, contracts]
  );

  const isAdminSkip =
    contracts !== "apTeam" &&
    //skip query if user didn't provide any address
    (contracts.cw3 === undefined || contracts.cw4 === undefined);

  return { contract, wallet, isAdminSkip };
}
