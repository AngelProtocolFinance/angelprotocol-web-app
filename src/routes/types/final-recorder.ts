import type { IAllocation } from "@better-giving/donation/schema";

export interface FromAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface From {
  /** full name */
  name: string;
  /** email */
  id: string;
  title?: string;
  address?: FromAddress;
  uk_gift_aid: boolean;
  is_public: boolean;
  message?: string;
  company_name?: string;
}

export interface To {
  /** endow id or fund id */
  id: string;
  name: string;
  /** endow ids, empty for fund */
  members: number[];
  /** tipping is disabled */
  no_tip: boolean;
  message?: string;
  allocation: IAllocation;
}

export interface Amount {
  total: number;
  tip: number;
  fee_allowance: number;
  currency: string;
  /** usd value of total */
  usd_value: number;
  settled_net: number;
  settled_fee: number;
}
export interface Via {
  /* fiat ,chain_id */
  id: string;
  /** STRIPE, CHARIOT, chain_name */
  name: string;
  method: string;
}

export interface Destination {
  /** chain_id, fiat */
  id: string;
  currency: string;
  /** stripe: payment-intent id, np: payment_id, chariot: grant-id */
  hash: string;
}

export interface Program {
  id: string;
  name: string;
}

export interface TributeNotif {
  to_fullname: string;
  to_email: string;
  from_msg?: string;
}
export interface Tribute {
  /** full name */
  to: string;
  notif?: TributeNotif;
}

export interface FinalRecorderPayload {
  id: string;
  amount: Amount;
  app_used: string;
  via: Via;
  to: To;
  from: From;
  date: string;
  tribute?: Tribute;
  program?: Program;
  is_recurring: boolean;
  settled_in: Destination;
}

export interface Donor {
  name: string;
  email: string;
}
