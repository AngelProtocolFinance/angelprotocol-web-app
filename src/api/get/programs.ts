import type { Program } from "@better-giving/endowment";
import { plusInt } from "api/schema/endow-id";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { version as ver } from "services/helpers";
import { parse } from "valibot";

export async function getPrograms(endowIdParam: number | string | undefined) {
  const id = parse(plusInt, endowIdParam?.toString());
  const url = new URL(APIs.aws);
  url.pathname = `${ver(1)}/endowments/${id}/programs`;
  return cacheGet(url).then<Program[]>((res) => res.json());
}
