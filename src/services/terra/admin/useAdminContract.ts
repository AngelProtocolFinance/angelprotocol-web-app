import { useMemo } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import APAdmin, { CharityAdmin } from "contracts/APAdmin";
import { AdminQueryAddresses } from "./types";

export default function useAdminContract(addresses: AdminQueryAddresses) {
  const wallet = useConnectedWallet();

  const contract = useMemo(() => {
    if (addresses === "apTeam") {
      //apTeam admin has static addresses
      return new APAdmin(wallet);
    } else {
      return new CharityAdmin(addresses, wallet);
    }
  }, [wallet, addresses]);

  const isSkip =
    addresses !== "apTeam" &&
    //skip query if user didn't provide any address
    (addresses.cw3 === undefined || addresses.cw4 === undefined);

  return { contract, wallet, isSkip };
}
