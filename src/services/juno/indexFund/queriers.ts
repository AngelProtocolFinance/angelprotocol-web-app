import Indexfund, { IF, T } from "contracts/IndexFund";
import { useContract } from "../useContract";
import { indexFund_api } from "./indexFund";

export function useFundList() {
  const { useFundListQuery } = indexFund_api;
  const { contract } = useContract<IF, T>(Indexfund);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useFundListQuery(contract.fundList);

  return { fundList: data, isFundListLoading: isLoading || isFetching };
}

//selects a fund from funds[] cache and returns members
export function useFundMembers(fundId: string) {
  const { useFundListQuery } = indexFund_api;
  const { contract } = useContract<IF, T>(Indexfund);
  const { fundMembers = [], isFundMembersLoading } = useFundListQuery(
    contract.fundList,
    {
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        fundMembers: data?.find((fund) => fund.id === +fundId)?.members,
        isFundMembersLoading: isLoading || isFetching,
      }),
    }
  );

  return { fundMembers, isFundMembersLoading };
}

export function useAllianceMembers() {
  const { useAllianceMembersQuery } = indexFund_api;
  const { contract } = useContract<IF, T>(Indexfund);
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useAllianceMembersQuery(contract.allianceMembers);

  return {
    allianceMembers: data,
    isAllianceMembersLoading: isLoading || isFetching,
    isError,
  };
}

export function useIndexFundConfig() {
  const { useConfigQuery } = indexFund_api;
  const { contract } = useContract<IF, T>(Indexfund);
  const { data, isLoading, isFetching, isError } = useConfigQuery(
    contract.config
  );

  return {
    indexFundConfig: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}
