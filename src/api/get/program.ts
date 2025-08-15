import { $int_gte1 } from "@better-giving/schemas";
import { parse, pipe, string, uuid } from "valibot";
import { ap, ver } from "../api";

export const getProgram = async (
  endowIdParam: string | undefined | number,
  programIdParam: string | undefined
) => {
  const id = parse($int_gte1, endowIdParam?.toString());
  const programId = parse(pipe(string(), uuid()), programIdParam);
  return ap.get(`${ver(1)}/endowments/${id}/programs/${programId}`).json();
};
