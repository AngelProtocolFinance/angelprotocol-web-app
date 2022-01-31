export interface Values {
  transactionDate: string; // e.g new Date().toISOString()
  transactionId: string; // tx hash
  amount: number; // e.g 1000 (shown in form as 1000 UST)s
  fullName: string; // "John Doe"
  email: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;

  //metadata
  splitLiq: string;
}
