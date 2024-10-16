import { endowId } from "api/schema/endow-id";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { version as ver } from "services/helpers";
import type { Program } from "types/aws";
import { parse } from "valibot";

export async function getPrograms(endowIdParam: number | string | undefined) {
  const id = parse(endowId, endowIdParam?.toString());
  const url = new URL(APIs.aws);
  url.pathname = `${ver(1)}/endowments/${id}/programs`;
  return cacheGet(url).then<Program[]>((res) => res.json());
}
