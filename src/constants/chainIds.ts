import { ChainID } from "types/aws";
import { Chains } from "types/lists";
import { chainIDs } from "./chains";
import { IS_TEST } from "./env";

const network = IS_TEST ? "Main" : "Test";

export const chainIds: { [key in Chains]: ChainID } = {
  binance: chainIDs[`binance${network}`],
  ethereum: chainIDs[`ethereum${network}`],
  juno: chainIDs[`juno${network}`],
  polygon: chainIDs[`polygon${network}`],
  terra: chainIDs[`terra${network}`],
};
