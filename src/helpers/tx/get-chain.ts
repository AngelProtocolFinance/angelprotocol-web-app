import { APIs } from "constants/urls";
import type { Chain } from "types/aws";

export const getChain = async <T extends string>(
  chainId: T
): Promise<Chain<T>> => {
  return fetch(`${APIs.apes}/chains/${chainId}`).then<Chain<T>>((res) =>
    res.json()
  );
};
