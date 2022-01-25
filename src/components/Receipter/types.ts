export interface Values {
  transactionDate: string; // e.g new Date().toISOString()
  transactionId: string; // tx hash
  amount: number; // e.g 1000 (shown in form as 1000 UST)
  splitLiq: string; //indicates the % of liquid amount set by the donor
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
