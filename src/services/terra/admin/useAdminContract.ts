import { useMemo } from "react";
import Admin, { CWContracts } from "contracts/Admin";
import { useGetter } from "store/accessors";
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
