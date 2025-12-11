export type AccountType = "savings" | "investments";

export interface Props {
  /** If not provided, user can select via radio buttons */
  account_type?: AccountType;
  /** NPO name used in reference memo */
  npo_name: string;
  /** NPO ID used in reference memo */
  npo_id: string;
}
