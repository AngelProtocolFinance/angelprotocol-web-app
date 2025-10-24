import type { ICurrencyFv, ITokenFv, OptionType } from "types/components";
import type { IDonationFvBase, Tribute } from "../types";

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

export const init_donation_fv: IDonationFvBase = {
  tip: "",
  tip_format: "15",
  cover_processing_fee: false,
  first_name: "",
  last_name: "",
  email: "",
};

export const init_tribute_notif: Tribute["notif"] = {
  to_email: "",
  to_fullname: "",
  from_msg: "",
};
