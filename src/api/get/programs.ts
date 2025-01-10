import type { Program } from "@better-giving/endowment";
import { plusInt } from "api/schema/endow-id";
import { parse } from "valibot";
import { apUrl, ver } from "../api";

export async function getPrograms(endowIdParam: number | string | undefined) {
  const id = parse(plusInt, endowIdParam?.toString());
  const res = await fetch(`${apUrl}/${ver(1)}/endowments/${id}/programs`);
  if (!res.ok) throw res;
  return res.json() as Promise<Program[]>;
}
