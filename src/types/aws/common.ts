interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export type EndowListPaginatedAWSQueryRes<T> = {
  Page: number;
  NumOfPages: number;
  Items: T;
};
export type PaginatedAWSQueryRes<T> = AWSQueryRes<T> & {
  ItemCutoff: number | null;
};

export type FileObject = {
  name: string;
  publicUrl: string;
};

export namespace Crypto {
  export namespace Payment {
    export type Status =
      /** Waiting for the customer to send the payment. The initial status of each payment. */
      | "waiting"
      /** The transaction is being processed on the blockchain. Appears when NOWPayments detects the funds from the user on the blockchain. */
      | "confirming"
      /** The process is confirmed by the blockchain. Customer's funds have accumulated enough confirmations. */
      | "confirmed"
      /** The funds are being sent to your personal wallet. NOWPayments is in the process of sending the funds to you. */
      | "sending"
      /** Shows that the customer sent less than the actual price. Appears when the funds have arrived in your wallet. */
      | "partially_paid"
      /** The funds have reached your personal address and the payment is finished. */
      | "finished"
      /** The payment wasn't completed due to an error of some kind. */
      | "failed"
      /** The funds were refunded back to the user. */
      | "refunded"
      /** The user didn't send the funds to the specified address within the 7-day time window. (20 min if fixed_rate) */
      | "expired";
  }

  interface Payment {
    payment_id: number;

    // order link to payment
    order_id: string;
    order_description: string;

    // to pay amount in usd
    price_amount: number;
    price_currency: string;

    // to pay amount in crypto
    pay_amount: number;
    pay_currency: string;
    pay_address: string;

    /** e.g. memo */
    payin_extra_id: string | null;

    payment_status: Payment.Status;
  }

  export interface PaymentStatus extends Payment {
    invoice_id: number;
    /** can add additional payments to this purchase_id */
    purchase_id: number;

    actually_paid: 0;
    /** only shows up after status:confirmed */
    actually_paid_fiat?: 0;

    /** iso */
    created_at: string;
    updated_at: string;

    outcome_amount: number;
    outcome_currency: string;

    /** tx: user wallet -> pay_address  */
    payin_hash: string | null;
    payout_hash: string | null;

    /**@ignore */
    type: string;
    /**@ignore */
    burning_percent: string;
  }

  export interface NewPayment extends Omit<Payment, "payment_id"> {
    payment_id: string;
    /** can add additional payments to this purchase_id */
    purchase_id: string;

    /** iso */
    created_at: string;
    /** iso */
    updated_at: string;

    ipn_callback_url: string;
    is_fee_paid_by_user: boolean;
    is_fixed_rate: boolean;

    smart_contract: string | null;
    network_precision: string | null;
    network: string;

    /** iso */
    expiration_estimate_date: string;
    /** iso */
    valid_until: string;
    time_limit: number | null;

    /**@ignore */
    product: string;
    /**@ignore   */
    type: string;
    /**@ignore */
    burning_percent: null;
  }

  export interface Estimate {
    currency_from: string;
    currency_to: string;
    /** denominated in currency_from */
    min_amount: number;

    /** denominated in params.fiat_equivalent */
    fiat_equivalent?: number;
  }

  export namespace Estimate {
    export interface Params {
      currency_from: string;
      currency_to?: string;
      /** e.g. "usd, eur" */
      fiat_equivalent?: string;

      //not used in our flows
      is_fixed_rate?: boolean;
      is_fee_paid_by_user?: boolean;
    }
  }
}
