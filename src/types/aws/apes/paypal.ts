/** See response type in https://developer.paypal.com/docs/api/orders/v2/#orders_capture */
export interface PayPalOrder {
  id: string;
  status: Status;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  links: Link[];
}

type Status =
  | "CREATED"
  | "SAVED"
  | "APPROVED"
  | "VOIDED"
  | "COMPLETED"
  | "PAYER_ACTION_REQUIRED";

interface Link {
  href: string;
  rel: string;
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "HEAD"
    | "CONNECT"
    | "OPTIONS"
    | "PATCH";
}

interface Payer {
  name: Name;
  email_address: string;
  payer_id: string;
}

interface Name {
  given_name: string;
  surname: string;
}

interface PaymentSource {
  paypal: Paypal;
}

interface Paypal {
  name: Name;
  email_address: string;
  account_id: string;
}

interface PurchaseUnit {
  reference_id: string;
  shipping: Shipping;
  payments: Payments;
}

interface Payments {
  captures: Capture[];
}

interface Capture {
  id: string;
  status: string;
  amount: Amount;
  seller_protection: SellerProtection;
  final_capture: boolean;
  disbursement_mode: string;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  create_time: Date;
  update_time: Date;
  links: Link[];
}

interface Amount {
  currency_code: string;
  value: string;
}

interface SellerProtection {
  status: string;
  dispute_categories: string[];
}

interface SellerReceivableBreakdown {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
}

interface Shipping {
  address: Address;
}

interface Address {
  address_line_1: string;
  address_line_2: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}
