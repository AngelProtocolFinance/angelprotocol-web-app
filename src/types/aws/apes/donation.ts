import { DonationSource } from "types/lists";
import { ChainID } from "../../chain";

export type Donor = {
  email: string;
  firstName: string;
  lastName: string;
};

export type KYCData = {
  fullName: string; // "John Doe"
  kycEmail: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
};

type DonationRecordBase = {
  amount: number;
  chainId: ChainID | "staging" | "fiat";
  date: string;
  hash: string;
  symbol: string;
  kycData?: KYCData;
};

type DonorAddress = string;
type RecipientEndowId = string;

export type DonationReceivedByEndow = DonationRecordBase & {
  id: DonorAddress;
  //only relevant for now in admin
  //some record doesn't have this attribute
  //percent string
  splitLiq?: string;
};

export type DonationMadeByDonor = DonationRecordBase & {
  id: RecipientEndowId;
  chainName: string;
  charityName: string;
  donationFinalized: boolean;
  usdValue: number;
};

export type DonationRecord = DonationReceivedByEndow | DonationMadeByDonor;

export type ReceiptPayload = KYCData & {
  transactionId: string; // tx hash
};
export type DonationsQueryParams = {
  id: string;
  chain_id: string;
  afterDate?: string;
  beforeDate?: string;
  chainName?: string;
  denomination?: string;
  status?: string;
  start?: number; //to load next page, set start to ItemCutOff + 1
  limit?: number; // Number of items to be returned per request
};

export type CryptoDonation = {
  amount: number;
  denomination: string;
  endowmentId: number;
  chainId: string;
  transactionId: string;
  walletAddress: string;
  /** 1 - 100 */
  splitLiq: number;
  chainName: string;
  appUsed: DonationSource;
};

export type FiatCurrencyData = {
  currencies: {
    /** ISO 3166-1 alpha-3 code */
    currency_code: string;
    minimum_amount: number;
    rate: number;
    timestamp: string;
  }[];
};
