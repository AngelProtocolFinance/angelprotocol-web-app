import type { Chain } from "types/aws";

//TODO: fetch from AWS
export const getChain = async <T extends string>(
  chainId: T
): Promise<Chain<T>> => {
  return {} as any;
};
