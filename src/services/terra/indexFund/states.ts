import { chainIDs } from "constants/chainIDs";
import Indexfund, { IF, T } from "contracts/IndexFund";
import { useContract } from "../useContract";
import { indexFund_api } from "./indexFund";

export function useIndexFundConfigState() {
  const { wallet, contract } = useContract<IF, T>(Indexfund);
  const { data, isLoading, isFetching } =
    indexFund_api.endpoints.config.useQueryState(contract.config, {
      skip: wallet?.network.chainID === chainIDs.localterra,
    });

  return {
    indexFundConfigState: data,
    isIndexFundConfigStateLoading: isLoading || isFetching,
  };
}
