import { chainIDs } from "contracts/types";
import { useAdminContract } from "../contracts";
import { admin_api } from "./admin";

export function useMembers() {
  const { useMembersQuery } = admin_api;
  const { wallet, contract } = useAdminContract();
  const { data = [] } = useMembersQuery(contract.members, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });
  return data;
}
