import { cw20_api } from "./cw20";
import useCW20Contract from "./useCW20Contract";

export function useCW20BalanceState(
  queryAddr?: string,
  cw20ContractAddr?: string
) {
  /**
   * @param queryAddr - address you want to know the balance of
   * @param cw20ContractAddr - address you want to query queryAddr balance from
   */
  const { contract } = useCW20Contract(cw20ContractAddr!);
  const {
    data = 0,
    isLoading,
    isFetching,
    isError,
  } = cw20_api.endpoints.CW20Balance.useQueryState(
    contract.balance(queryAddr!),
    {
      skip: !queryAddr || !cw20ContractAddr,
    }
  );
  return {
    cw20Balance: data,
    cw20BalanceLoading: isLoading || isFetching,
    cw20BalanceError: isError,
  };
}
