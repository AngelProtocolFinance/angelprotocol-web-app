import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { version as v } from "services/helpers";
import { parse, pipe, string, uuid } from "valibot";
import { plusInt } from "../schema/endow-id";

export const getProgram = async (
  endowIdParam: string | undefined | number,
  programIdParam: string | undefined
) => {
  const id = parse(plusInt, endowIdParam?.toString());
  const programId = parse(pipe(string(), uuid()), programIdParam);
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/endowments/${id}/programs/${programId}`;
  return cacheGet(url).then((res) => res.json());
};
