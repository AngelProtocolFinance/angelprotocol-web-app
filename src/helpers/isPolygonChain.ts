import { chainIds } from "constants/chainIds";

export function isPolygonChain(chain: string) {
  switch (chain) {
    case chainIds.polygon:
      return true;
    default:
      return false;
  }
}
