export interface PutRequestValues {
  transactionId: string;
  body: {
    fullName: string;
    email: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    split_liq: string;
  };
}
