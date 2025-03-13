import type { WithId } from "mongodb";

interface IBmf {
  ein: string;
  name: string;
  in_care_of_name?: string;
  street?: string;
  city?: string;
  //filter
  state?: string;
  zip?: string;
  //text filter - exact
  group_exemption_number?: string;
  //filter
  subsection_code?: string;
  //filter
  affilation_code?: string;
  //filter
  classification_code?: string;
  ruling_date?: string;
  //filter
  deductibility_code?: string;
  //filter
  foundation_code?: string;
  //filter
  activity_code?: string;
  //filter
  organization_code?: string;
  //filter
  exempt_organization_status_code?: string;
  tax_period?: string;
  asset_code?: string;
  income_code?: string;
  //filter
  filing_requirement_code?: string;
  //filter
  pf_filing_requirement_code?: string;
  accounting_period?: string;
  asset_amount?: number;
  income_amount?: number;
  revenue_amount?: number;
  ntee_code?: string;
  sort_name?: string;
  terminated?: boolean;
}

interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  province?: string;
  state?: string;
  country?: string;
}
export interface PrincipalOfficer {
  name?: string;
  address?: Address & { zipcode?: string };
}

export interface MailingAddress extends Address {
  postal_code?: string;
}

interface IPostCardItem {
  ein: string;
  tax_year?: string;
  name: string;
  gross_receipts_not_greater_than?: boolean;
  tax_period_begin?: string;
  tax_period_end?: string;
  website_url?: string;
  principal_officer?: PrincipalOfficer;
  mailing_address?: MailingAddress;
  dba?: string[];
}

interface IPub78 {
  ein: string;
  name: string;
  city?: string;
  state?: string;
  country?: string;
  deductibility_code_pub78?: string;
}

// bmf fields take precedence in actual
export interface Nonprofit extends IBmf, IPostCardItem, IPub78 {}

export interface NonprofitItem extends WithId<Nonprofit> {}
