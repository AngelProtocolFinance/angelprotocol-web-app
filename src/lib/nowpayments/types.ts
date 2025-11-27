/** NOWPayments API documentation @see https://nowpayments.io/api */
export declare namespace NP {
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

    /** denominated in outcome_currency */
    export interface Fee {
      currency: string;
      depositFee: number;
      serviceFee: number;
      withdrawalFee: number;
    }

    export type TestCase = "success" | "common" | "failed" | "partially_paid";

    export interface Request {
      /** invoice id from create-invoice  */
      iid: string;
      pay_currency: string;
      order_description?: string;
      customer_email?: string;

      /** @ignore alternative address to receive funds */
      payout_address?: string;
      /** @ignore payout address */
      payout_extra_id?: string | null;
      /** @ignore (required if payout_address is specified) */
      payout_currency?: string;
      /** @ignore @internal */
      purchase_id?: string;

      /** @ignore - only used for testing */
      case?: TestCase;
    }
  }

  export interface Payment {
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

    actually_paid: number;

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
    /**@ignore */
    actually_paid_fiat?: number;
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

  export interface PaymentPayload extends Payment {
    invoice_id: number;
    /** can add additional payments to this purchase_id */
    purchase_id: string;

    actually_paid: number;
    actually_paid_at_fiat: number;

    outcome_amount: number;
    outcome_currency: string;
    fee: Payment.Fee;

    parent_payment_id: number | null;
    /** if multiple payments that require extra_id in single payment_id  */
    payment_extra_ids: string[] | null;
  }

  export interface Invoice {
    id: string;
    // others: we don't interact with invoice directly
  }

  export namespace Invoice {
    interface Request {
      /** amount in fiat: currency - "usd, eur.." */
      price_amount: number;
      price_currency: string;

      /**amount in crypto: optional in api, but requried in our flows  */
      pay_currency: string;
      /** optional in api, but required in our flows  */
      ipn_callback_url: string;

      // optional in api: but required in our flows
      order_id: string;
      order_description: string;

      /// NOT USED in our flows ///
      success_url?: string;
      cancel_url?: string;
      is_fixed_rate?: boolean;
      is_fee_paid_by_user?: boolean;
    }
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
    interface Params {
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
