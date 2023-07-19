import { AxelarBridgeFees } from "types/aws";
import { chainIds } from "constants/chainIds";

export const fee = (
  network: string,
  fees: AxelarBridgeFees["withdraw"]
): number => {
  switch (network) {
    case chainIds.binance:
      return Math.ceil(fees.binance);
    case chainIds.ethereum:
      return Math.ceil(fees.ethereum);
    case chainIds.terra:
      return Math.ceil(fees["terra-2"]);
    case chainIds.juno:
      return Math.ceil(fees.juno);
    default:
      return 0;
  }
};

export const names = (
  network: string
): "Binance" | "Ethereum" | "Polygon" | "Terra" | "Juno" => {
  //prettier-ignore
  switch (network) {
    case chainIds.binance: return "Binance";
    case chainIds.polygon: return "Polygon";
    case chainIds.ethereum: return "Ethereum";
    case chainIds.terra: return "Terra";
    default: return "Juno";
  }
};
