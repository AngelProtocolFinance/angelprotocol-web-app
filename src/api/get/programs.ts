import type { Program } from "@better-giving/endowment";
import { plusInt } from "api/schema/endow-id";
import { parse } from "valibot";
import { ap, ver } from "../api";

export async function getPrograms(endowIdParam: number | string | undefined) {
  const id = parse(plusInt, endowIdParam?.toString());
  return ap.get<Program[]>(`${ver(1)}/endowments/${id}/programs`).json();
}
