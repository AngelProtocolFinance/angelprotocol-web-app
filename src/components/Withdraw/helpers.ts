import { VaultFields } from "components/Withdraw/types";
export type Type = {};

export type AmountInfo = { field_id: VaultFields; amount?: string };

export function is_zero(amountInfos: AmountInfo[]) {
  return amountInfos.reduce(
    (result, info) =>
      result || info.amount === undefined || info.amount === "0",
    false
  );
}

export function filter_infos(amountInfos: AmountInfo[]) {
  return amountInfos.filter(
    (info) => info.amount !== undefined || info.amount !== 0
  );
}
