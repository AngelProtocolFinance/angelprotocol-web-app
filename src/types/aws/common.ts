export interface AWSQueryRes<T> {
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

  /** payment by invoice */
  export interface Payment {
    /** Unique identifier for the created payment */
    payment_id: string;

    /** Current status of the payment */
    payment_status: Payment.Status;

    /** Address where the customer should send the payment */
    pay_address: string;

    /** Price amount in the price currency */
    price_amount: number;

    /** Currency of the price */
    price_currency: string;

    /** Amount that the customer needs to pay in the payment currency */
    pay_amount: number;

    /** Currency in which the customer should make the payment */
    pay_currency: string;

    /** Your order ID */
    order_id: string;

    /** Description of the order */
    order_description: string;

    /** URL for the Instant Payment Notification callback */
    ipn_callback_url: string;

    /** Timestamp of when the payment was created */
    created_at: string;

    /** Timestamp of the last update to the payment */
    updated_at: string;

    /** Your purchase ID */
    purchase_id: string;

    /** Amount received from the customer (null if not received yet) */
    amount_received: number | null;

    /** Extra ID for the payment input (null if not applicable) */
    payin_extra_id: string | null;

    /** Smart contract address (empty string if not applicable) */
    smart_contract: string;

    /** Network of the cryptocurrency */
    network: string;

    /** Precision of the network (number of decimal places) */
    network_precision: number;

    /** Time limit for the payment (null if no limit) */
    time_limit: number | null;

    /** Percentage of burning (null if not applicable) */
    burning_percent: number | null;

    /** Estimated expiration date of the payment */
    expiration_estimate_date: string;
  }

  export interface Invoice {
    /** Unique identifier for the invoice */
    id: string;

    /** Internal token ID */
    token_id: string;

    /** Order ID specified in the request */
    order_id: string;

    /** Order description specified in the request */
    order_description: string;

    /** Base price in fiat currency */
    price_amount: string;

    /** Ticker of the base fiat currency */
    price_currency: string;

    /** Currency the customer will pay with. If 'null', the customer can choose the currency in the web interface */
    pay_currency: string | null;

    /** Link to your endpoint for IPN notifications catching */
    ipn_callback_url: string;

    /** Link to the payment page that you can share with your customer */
    invoice_url: string;

    /** Customer will be redirected to this link once the payment is finished */
    success_url: string;

    /** Customer will be redirected to this link if the payment fails */
    cancel_url: string;

    /** Customer will be redirected to this link if the payment gets partially paid */
    partially_paid_url: string;

    /** Current status of the invoice */
    status: string;

    /** Ticker of the payout currency */
    payout_currency: string;

    /** Time of invoice creation */
    created_at: string;

    /** Time of latest invoice information update */
    updated_at: string;

    /** True if Fixed Rate option is enabled, false otherwise */
    is_fixed_rate: boolean;

    /** True if Fee Paid By User option is enabled, false otherwise */
    is_fee_paid_by_user: boolean;
  }

  export interface Estimate {
    /** The currency from which the payment is made */
    currency_from: string;

    /** The currency to which the payment is converted */
    currency_to: string;

    /** The minimal amount for payment using the specified currencies */
    min_amount: number;

    /** The fiat equivalent for the calculated minimal amount (optional) */
    fiat_equivalent?: number;
  }

  export namespace Estimate {
    export interface Params {
      /** The currency from which the payment is made */
      currency_from: string;

      /** The currency to which the payment is converted (optional) */
      currency_to?: string;

      /** The fiat currency for equivalent calculation (optional) */
      fiat_equivalent?: string;

      /** Whether the rate is fixed (optional) */
      is_fixed_rate?: boolean;

      /** Whether the fee is paid by the user (optional) */
      is_fee_paid_by_user?: boolean;
    }
  }
}
