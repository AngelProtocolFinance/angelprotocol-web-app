import Indexfund, { IF, T } from "contracts/IndexFund";
import { chainIDs } from "constants/chainIDs";
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
    skip: wallet?.network.chainID === chainIDs.terra_local,
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
      skip: fundId === "" || wallet?.network.chainID === chainIDs.terra_local,
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
  const { wallet, contract } = useContract<IF, T>(Indexfund);
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useAllianceMembersQuery(contract.allianceMembers, {
    skip: wallet?.network.chainID === chainIDs.terra_local,
  });

  return {
    allianceMembers: data,
    isAllianceMembersLoading: isLoading || isFetching,
    isError,
  };
}

export function useIndexFundConfig() {
  const { useConfigQuery } = indexFund_api;
  const { wallet, contract } = useContract<IF, T>(Indexfund);
  const { data, isLoading, isFetching, isError } = useConfigQuery(
    contract.config,
    {
      skip: wallet?.network.chainID === chainIDs.terra_local,
    }
  );

  return {
    indexFundConfig: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}
