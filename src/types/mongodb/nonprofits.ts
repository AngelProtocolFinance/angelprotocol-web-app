import type { WithId } from "mongodb";

export interface Indexed {
  /** Asset amount (can be NaN) */
  assets?: number; //-1
  /** Income amount (can be NaN) */
  income?: number; //-1
  /** Revenue amount (can be NaN) */
  revenue?: number; //-1
}
export interface Nonprofit extends Indexed {
  /** Employer Identification Number (unique identifier) */
  ein: string;

  /** Organization name */
  name: string;

  /** City */
  city: string;

  /** State */
  state: string;

  /** Country */
  country: string;

  /** IRS deductibility code (e.g. "PC", "POF") */
  deductibility_code: string;

  /** ZIP code (can be missing/undefined) */
  zip?: string;

  /** Tax subsection (501(c)(3), etc.) - numeric (can be NaN) */
  subsection?: number;

  /** Foundation status code - numeric (can be NaN) */
  foundation?: number;

  /** National Taxonomy of Exempt Entities code (can be NaN for string fields) */
  ntee_code?: string;

  /** Record creation timestamp */
  created_at: Date;

  /** Record update timestamp */
  updated_at: Date;
}

export interface NonprofitItem extends WithId<Nonprofit> {}
