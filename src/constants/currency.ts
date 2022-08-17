import { Denoms } from "types/lists";
import { IS_TEST } from "./env";

export const denoms: { [key in Denoms]: string } = {
  axlusdc:
    "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
  halo: "halo",
  juno: IS_TEST ? "ujunox" : "ujuno",
};

export const symbols: { [key in Denoms]: string } = {
  axlusdc: "axlUSDC",
  halo: "HALO",
  juno: IS_TEST ? "JUNOX" : "JUNO",
};
