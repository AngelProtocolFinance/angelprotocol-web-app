import type { SingleFund } from "@better-giving/fundraiser";
import { parse, pipe, string, uuid } from "valibot";
import { ap, ver } from "../api";

export const getFund = (fundIdParam: string | undefined) => {
  const id = parse(pipe(string(), uuid()), fundIdParam);
  return ap.get<SingleFund>(`${ver(1)}/funds/${id}`).json();
};
