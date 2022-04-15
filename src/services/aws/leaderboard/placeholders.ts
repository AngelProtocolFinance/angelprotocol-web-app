import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";
import { Endowment } from "./types";
import { Update } from "./types";

export const placeholderUpdate: Update = {
  endowments: [],
  last_update: new Date().toISOString(),
};

export const endowment: Endowment = {
  endowment_address: "",
  charity_owner: "",
  charity_name: "Charity",
  total_liq: 0,
  total_lock: 0,
  overall: 0,
  charity_logo: defaultIcon,
  charity_overview: "",
  url: "https://angelprotocol.io",
  tier: 3,
  iconLight: false,
};
