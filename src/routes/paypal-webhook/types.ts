export interface ICapture {
  id: string;
}

interface IOrder {
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
export interface IEventOther {
  id: string;
  event_type: "other";
  resource: unknown;
}

export type TWebhookEvent =
  | IEventCaptureCompleted
  | IEventOrderApproved
  | IEventOther;
