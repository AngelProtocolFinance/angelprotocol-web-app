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
