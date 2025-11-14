export interface ICapture {
  id: string;
  supplementary_data: {
    related_ids: {
      order_id: string;
    };
  };
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
export interface IEventOther {
  id: string;
  event_type: string;
  resource: any;
}

export type TWebhookEvent =
  | IEventCaptureCompleted
  | IEventOrderApproved
  | IEventOther;
