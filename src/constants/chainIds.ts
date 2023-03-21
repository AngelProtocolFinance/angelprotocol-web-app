import { Chains } from "types/lists";
import { chainIDs } from "./chains";
import { IS_TEST } from "./env";

type SuppChains = { [key in Chains]: chainIDs };

const network = IS_TEST ? "Main" : "Test";

export const chainIds: SuppChains = {
  binance: chainIDs[`binance${network}`],
  ethereum: chainIDs[`ethereum${network}`],
  juno: chainIDs[`juno${network}`],
  polygon: chainIDs[`polygon${network}`],
  terra: chainIDs[`terra${network}`],
};
