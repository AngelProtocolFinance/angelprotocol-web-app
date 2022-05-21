import { useMemo } from "react";
import { CWContracts } from "types/server/contracts";
import { useGetter } from "store/accessors";
import Admin from "contracts/Admin";
import useWalletContext from "hooks/useWalletContext";

export default function useAdminContract(customCWs?: CWContracts) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const cws = customCWs || cwContracts;
  const { wallet } = useWalletContext();

  const contract = useMemo(() => new Admin(cws, wallet), [wallet, cws]);

  const isAdminSkip =
    cws !== "apTeam" &&
    //skip query if user didn't provide any address
    (cws.cw3 === undefined || cws.cw4 === undefined);

  return { contract, wallet, isAdminSkip };
}
