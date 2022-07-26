import { UnsupportedNetworkError, WrongNetworkError } from "errors/errors";
import { ChainId, allChainIds, chainIds } from "constants/chainIds";

export function parseChainId(chainId: string | number): ChainId {
  const chainIdString =
    typeof chainId === "string" ? chainId : chainId.toString();

  if (
    Object.values(chainIds).find(
      (expectedChainId) => expectedChainId === chainId
    )
  ) {
    return chainIdString as ChainId;
  }

  if (allChainIds.find((x) => x === chainIdString)) {
    throw new WrongNetworkError("Juno");
  }

  throw new UnsupportedNetworkError(chainIdString);
}
