import { AxelarBridgeFees } from "types/aws";
import { chainIds } from "constants/chainIds";

export const fee = (
  network: string,
  fees: AxelarBridgeFees["withdraw"]
): number => {
  //prettier-ignore
  switch (network) {
    case chainIds.binance: return Math.ceil(fees.binance);
    case chainIds.polygon: return Math.ceil(fees.polygon);
    case chainIds.ethereum: return Math.ceil(fees.ethereum)
    default: return 0;
  }
};

export const names = (
  network: string
): "Binance" | "Ethereum" | "Polygon" | "Juno" => {
  //prettier-ignore
  switch (network) {
    case chainIds.binance: return "Binance";
    case chainIds.polygon: return "Polygon";
    case chainIds.ethereum: return "Ethereum";
    default: return "Juno";
  }
};
