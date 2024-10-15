import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { version as ver } from "services/helpers";
import type { Program } from "types/aws";

export async function getPrograms(endowId: number) {
  const url = new URL(APIs.aws);
  url.pathname = `${ver(1)}/endowments/${endowId}/programs`;
  return cacheGet(url).then<Program[]>((res) => res.json());
}
