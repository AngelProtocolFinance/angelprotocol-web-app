interface IMoney {
  value: string;
  currency_code: string;
}

interface IExchangeRate {
  /** uppercase */
  source_currency: string;
  /** lowercase */
  target_currency: string;
  /** usd per unit */
  value: string;
}

interface IBreakdown {
  exchange_rate: IExchangeRate;
  gross_amount: IMoney;
  paypal_fee: IMoney;
  net_amount: IMoney;
}

export interface ICapture {
  id: string;
  seller_receivable_breakdown: IBreakdown;
}

interface IOrder {
  /** iso date */
  create_time: string;
  id: string;
}

export interface IEventCaptureCompleted {
  id: string;
  event_type: "PAYMENT.CAPTURE.COMPLETED";
  resource: ICapture;
}
export interface IEventOrderApproved {
  id: string;
  event_type: "CHECKOUT.ORDER.APPROVED";
  resource: IOrder;
}

export type TWebhookEvent = IEventCaptureCompleted | IEventOrderApproved;
