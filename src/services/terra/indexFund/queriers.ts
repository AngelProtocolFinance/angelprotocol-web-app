import { chainIDs } from "constants/chainIDs";
import Indexfund, { IF, T } from "contracts/IndexFund";
import { useContract } from "../useContract";
import { indexFund_api } from "./indexFund";

export function useFundList() {
  const { useFundListQuery } = indexFund_api;
  const { wallet, contract } = useContract<IF, T>(Indexfund);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useFundListQuery(contract.fundList, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });

  return { fundList: data, isFundListLoading: isLoading || isFetching };
}

//selects a fund from funds[] cache and returns members
export function useFundMembers(fundId: string) {
  const { useFundListQuery } = indexFund_api;
  const { wallet, contract } = useContract<IF, T>(Indexfund);
  const { fundMembers = [], isFundMembersLoading } = useFundListQuery(
    contract.fundList,
    {
      skip: fundId === "" || wallet?.network.chainID === chainIDs.localterra,
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        fundMembers: data?.find((fund) => fund.id === +fundId)?.members,
        isFundMembersLoading: isLoading || isFetching,
      }),
    }
  );

  return { fundMembers, isFundMembersLoading };
}

export function useTCAMembers() {
  const { useTcaMembersQuery } = indexFund_api;
  const { wallet, contract } = useContract<IF, T>(Indexfund);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useTcaMembersQuery(contract.tcaMembers, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });

  return { tcaMembers: data, isTCAMembersLoading: isLoading || isFetching };
}
