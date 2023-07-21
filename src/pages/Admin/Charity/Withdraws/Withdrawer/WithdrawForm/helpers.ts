import { EndowFeeRates } from "./types";
import { ProtocolFeeRates } from "services/types";
import { BridgeFees } from "types/aws";
import { AccountType } from "types/lists";
import { chainIds } from "constants/chainIds";

export const bridgeFee = (
  destinationChain: string,
  bridgeFees: BridgeFees
): number => {
  switch (destinationChain) {
    case "binance":
      return Math.ceil(bridgeFees.binance);
    case chainIds.ethereum:
      return Math.ceil(bridgeFees.ethereum);
    case chainIds.terra:
      return Math.ceil(bridgeFees["terra-2"]);
    case chainIds.juno:
      return Math.ceil(bridgeFees.juno);
    default:
      return 0;
  }
};

export const chainName = (
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

export const feeRows = (
  destinationChainId: string,
  withdrawAmount: number,
  accountType: AccountType,
  bridgeFees: BridgeFees,
  protocolFeeRates: ProtocolFeeRates,
  endowFeeRates: EndowFeeRates
) => {};
