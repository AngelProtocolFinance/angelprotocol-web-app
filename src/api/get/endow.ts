import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { apiEnv } from "services/constants";

export async function getEndow(id: number) {
  const url = new URL(APIs.aws);
  url.searchParams.set("env", apiEnv);
  url.pathname = `v9/endowments/${id}`;
  return cacheGet(url).then((res) => res.json());
}
