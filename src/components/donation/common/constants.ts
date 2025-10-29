import type { ICurrencyFv, ITokenFv, OptionType } from "types/components";
import type { Tribute } from "../types";

export const DEFAULT_PROGRAM: OptionType<""> = {
  label: "General Donation",
  value: "",
};

export const init_token_option: ITokenFv = {
  precision: 6,
  min: 0,
  code: "",
  name: "",
  symbol: "",
  id: "",
  amount: "",
  network: "",
  cg_id: "",
  color: "",
  logo: "",
  rate: 1,
};

export const USD_CODE = "USD";
export const usd_option: ICurrencyFv = { code: USD_CODE, min: 1, rate: 1 };

export const init_tribute_notif: Tribute["notif"] = {
  to_email: "",
  to_fullname: "",
  from_msg: "",
};
