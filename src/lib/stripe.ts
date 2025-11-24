export interface ITributeNotif {
  toEmail: string;
  toFullName: string;
  /** may be empty */
  fromMsg: string;
}

export interface IAllocation {
  liq: number;
  lock: number;
  cash: number;
}

export interface IMetadataAttrDeprecated
  extends Record<string, string | undefined> {
  /** @deprecated  */
  chainId?: "fiat";
  /** @deprecated */
  chainName?: "Stripe" | "Fiat";
  /** @deprecated */
  destinationChainId?: "fiat";
  /** @deprecated bool str */
  donationFinalized?: string;
  /** @deprecated */
  fiatRamp?: "STRIPE";
  /** @deprecated */
  kycEmail?: string;
  /** @deprecated  */
  nonProfitMsg?: string;
  /** @deprecated */
  splitLiq?: string;
  /** @deprecated */
  status?: "intent";
}

export interface IMetadataAttr extends Record<string, string | undefined> {
  network: "staging" | "production";
  transactionId: string;
  /** iso, date when this tx is snapshotted to stripe as metadata
   *  @warning - don't use for settlement records
   */
  transactionDate: string;
  /** `"${bool}"` */
  isRecurring: string;
  /** `${number}`>= 0 */
  amount: string;
  /** `${number}`>= 0 */
  usdValue: string;
  /** `${number}`>= 0 */
  tipAmount: string;
  /** e.g. USD, AUD, PHP */
  denomination: string;
  /** `${number}`>= 0 */
  feeAllowance: string;
  /** JSON Allocation */
  allocation?: string;

  /// VIA ///
  /** bg-marketplace, bg-widget, .. */
  appUsed: string;
  form_id?: string;

  /// TO ///

  /** `${number}`, "0" for fundraisers */
  endowmentId: string;
  charityName: string;
  /** true, false */
  claimed?: string;
  /** `"${bool}"` */
  fiscalSponsored: string;
  /** `"${bool}" | "undefined ( neglible as records are >10mo )"` */
  hideBgTip: string;

  /** may be empty */
  programId?: string;
  /** may be empty */
  programName?: string;

  /** may be empty "" - when recipient is npo */
  fund_id?: string;
  /**int csv: may be empty "" - when recipient is npo */
  fund_members?: string;
  fund_name?: string;

  /// FROM ///
  email: string;
  title?: "Mr" | "Ms" | "Mrs" | "Mx" | "";
  fullName: string;
  company_name?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  msg_to_npo?: string;
  donor_message?: string;
  /** `"${bool}"` */
  donor_public?: string;
  /** `"${bool}"` */
  ukGiftAid?: string;

  /// TRIBUTE
  /** may be empty */
  inHonorOf?: string;
  /** TributeNotif JSON */
  tributeNotif?: string;
}

export interface IMetadata extends IMetadataAttr, IMetadataAttrDeprecated {}
export interface IMetadataSubs extends IMetadata {
  productId: string;
  /** `${number}`>= 0 */
  subsQuantity: string;
}

/** @deprecated */
export interface IMetadataLegacy extends Record<string, string | undefined> {
  /** @deprecated */
  donation_type: "one-time";
  /** @deprecated */
  intent_tx_id?: string;
}

/** accepted payment methods */
export type TPaymentMethods =
  | "acss_debit"
  | "amazon_pay"
  | "bancontact"
  | "card"
  | "cashapp"
  | "eps"
  | "ideal"
  | "link"
  | "p24"
  | "sepa_debit"
  | "sofort"
  | "us_bank_account";
