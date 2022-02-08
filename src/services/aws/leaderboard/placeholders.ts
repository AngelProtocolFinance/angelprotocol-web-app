import { Endowment } from "./types";
import { Update } from "./types";

export const placeholderUpdate: Update = {
  endowments: [],
  last_update: new Date().toISOString(),
};

export const endowment: Endowment = {
  address: "",
  overall: 0,
  total_liq: 0,
  total_lock: 0,
};
