import { parse, pipe, string, uuid } from "valibot";
import { ap, ver } from "../api";
import { plusInt } from "../schema/endow-id";

export const getProgram = async (
  endowIdParam: string | undefined | number,
  programIdParam: string | undefined
) => {
  const id = parse(plusInt, endowIdParam?.toString());
  const programId = parse(pipe(string(), uuid()), programIdParam);
  return ap.get(`${ver(1)}/endowments/${id}/programs/${programId}`).json();
};
