import { useMemo } from "react";
import { CWContracts } from "types/server/contracts";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter } from "store/accessors";
import Admin from "contracts/Admin";

export default function useAdminContract(customCWs?: CWContracts) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const cws = customCWs || cwContracts;
  const { wallet } = useGetWallet();

  const contract = useMemo(
    () => new Admin(cws, wallet?.address),
    [wallet, cws]
  );

  const isAdminSkip =
    cws !== "apTeam" &&
    //skip query if user didn't provide any address
    (cws.cw3 === undefined || cws.cw4 === undefined);

  return { contract, walletAddr: wallet?.address, isAdminSkip };
}
