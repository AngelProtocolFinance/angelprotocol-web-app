import { VaultFields } from "components/Transactors/Withdrawer/types";
export type Type = {};

export type AmountInfo = { field_id: VaultFields; amount?: string };

export function filter_infos(amountInfos: AmountInfo[]) {
  return amountInfos.filter(
    (info) => info.amount !== undefined || info.amount !== 0
  );
}
