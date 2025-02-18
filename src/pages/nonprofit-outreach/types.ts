import type { ColumnSort } from "@tanstack/react-table";
import type { ObjectId } from "mongodb";

export type OutreachStatus =
  | "pending"
  | "contacted"
  | "responded"
  | "completed"
  | "declined";

export interface Nonprofit {
  _id?: ObjectId;
  ein: string;
  name: string;
  city: string;
  state: string;
  country: string;
  deductibility_code: string;
  zip?: string;
  subsection?: string;
  foundation?: string;
  ntee_code?: string;
  assets?: number;
  income?: number;
  revenue?: number;
  contact_name?: string | null;
  contact_email?: string | null;
  migrate_to_hubspot: boolean;
  created_at: Date;
  updated_at: Date;
  last_outreach_date?: Date | null;
  outreach_status: OutreachStatus;
  marketing_notes?: string | null;
}

export interface CellInfo<T = any> {
  getValue: () => T;
  row: {
    original: Nonprofit;
  };
  column: {
    id: string;
  };
}

export interface SortInfo extends ColumnSort {
  id: string;
  desc: boolean;
}
