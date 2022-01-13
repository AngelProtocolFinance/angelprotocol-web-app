import { denoms } from "constants/currency";
import { ReactNode } from "react";

export interface Values {
  amount: string;
  split_liq: string;
  //metadata;
  currency: denoms.uusd | denoms.btc | denoms.ether | denoms.sol | denoms.uatom;
  min_liq: number;
  max_liq: number;
  to: "tca" | "fund" | "charity";
  receiver?: number | string;
}
export interface Receipt {
  transactionDate: string; // e.g new Date().toISOString()
  transactionId: string; // tx hash
  amount: number; // e.g 1000 (shown in form as 1000 UST)
  chainId?: string; //e.g "columbus-5", "bombay-12" or one of chainIDs enum values
  fundId?: number | string; // fundId or charityAddress
  charityId?: number | string; // fundId or charityAddress
  fullName: string; // "John Doe"
  email: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
  denomination: string; //"UST"
}

export type ErrorHandler = (message: string, url?: string) => void;

export interface XFI {
  bitcoin?: any;
  ethereum?: any;
  //others to add if needed
}

export interface DWindow extends Window {
  ethereum: any;
  xfi?: XFI;
}

interface FromTCA {
  to: "tca";
  receiver?: never;
  children: ReactNode;
  max_liq?: never;
  min_liq?: never;
}

interface ToFund {
  to: "fund";
  receiver?: number;
  children: ReactNode;
  max_liq?: number;
  min_liq?: number;
}

interface ToCharity {
  to: "charity";
  receiver: string;
  children: ReactNode;
  //doesn't know yet limits on charity donations
  max_liq?: number;
  min_liq?: number;
}

export type Props = ToFund | ToCharity | FromTCA;
