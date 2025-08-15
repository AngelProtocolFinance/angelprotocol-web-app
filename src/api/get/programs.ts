import type { Program } from "@better-giving/endowment";
import { $int_gte1 } from "@better-giving/schemas";
import { parse } from "valibot";
import { apUrl, ver } from "../api";

export async function getPrograms(endowIdParam: number | string | undefined) {
  const id = parse($int_gte1, endowIdParam?.toString());
  const res = await fetch(`${apUrl}/${ver(1)}/endowments/${id}/programs`);
  if (!res.ok) throw res;
  return res.json() as Promise<Program[]>;
}
