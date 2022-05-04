import { CW20Info, cw20_api } from "./cw20";
import useCW20Contract from "./useCW20Contract";

export function useCW20Balance(queryAddr?: string, cw20ContractAddr?: string) {
  /**
   * @param queryAddr - address you want to know the balance of
   * @param cw20ContractAddr - address you want to query queryAddr balance from
   */
  const { useCW20BalanceQuery } = cw20_api;
  const { contract } = useCW20Contract(cw20ContractAddr!);
  const {
    data = 0,
    isLoading,
    isFetching,
    isError,
  } = useCW20BalanceQuery(contract.balance(queryAddr!), {
    skip: !queryAddr || !cw20ContractAddr,
  });
  return {
    cw20Balance: data,
    cw20BalanceLoading: isLoading || isFetching,
    cw20BalanceError: isError,
  };
}

export const placeHolderCW20Info: CW20Info = {
  name: "",
  symbol: "",
  decimals: 6,
  total_supply: "1",
};
export function useCW20Info(cw20ContractAddr?: string) {
  const { useCW20InfoQuery } = cw20_api;
  const { contract } = useCW20Contract(cw20ContractAddr!);
  const { data = placeHolderCW20Info } = useCW20InfoQuery(contract.info, {
    skip: !cw20ContractAddr,
  });
  return data;
}
