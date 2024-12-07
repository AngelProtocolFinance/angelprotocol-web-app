import { plusInt } from "api/schema/endow-id";
import type { EndowmentBalances } from "types/aws";
import { parse } from "valibot";
import { apes, ver } from "../api";

export async function getEndowBalance(idParam: string | undefined) {
  const id = parse(plusInt, idParam);
  return apes.get<EndowmentBalances>(`${ver(1)}/balances/${id}`).json();
}
