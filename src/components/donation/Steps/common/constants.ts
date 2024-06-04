import { polygon, polygonAmoy } from "constants/chains";
import { IS_TEST } from "constants/env";
import type { ChainID } from "types/chain";
import type { DetailedCurrency, OptionType } from "types/components";
import type { TokenWithAmount } from "types/tx";

export const DEFAULT_PROGRAM: OptionType<""> = {
  label: "General Donation",
  value: "",
};

export const initTokenOption: TokenWithAmount = {
  approved: false,
  decimals: 6,
  logo: "",
  min_donation_amnt: 0,
  symbol: "Select token",
  token_id: "",
  coingecko_denom: "",
  type: "erc20",
  amount: "",
};

export const usdOption: DetailedCurrency = { code: "usd", min: 1, rate: 1 };

export const initChainIdOption: OptionType<ChainID> = IS_TEST
  ? { label: polygonAmoy.name, value: polygonAmoy.id }
  : { label: polygon.name, value: polygon.id };
